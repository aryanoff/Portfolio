import math
import random
from pathlib import Path

import bpy
from mathutils import Vector


SOURCE = Path(r"C:\Users\OCN\OneDrive\Pictures\3D with Blender\donut&cup.blend")
OUTPUT = SOURCE.with_name("donut&cup_render_ready.blend")


def set_object_mode():
    if bpy.ops.object.mode_set.poll():
        bpy.ops.object.mode_set(mode="OBJECT")


def make_mat(name, color, roughness=0.45, metallic=0.0):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = color
        bsdf.inputs["Roughness"].default_value = roughness
        bsdf.inputs["Metallic"].default_value = metallic
    return mat


def assign_mat(obj, mat):
    obj.data.materials.clear()
    obj.data.materials.append(mat)


def shade_smooth(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.shade_smooth()
    obj.select_set(False)


def add_modifier(obj, mod_type, name, **settings):
    mod = obj.modifiers.get(name) or obj.modifiers.new(name, mod_type)
    for key, value in settings.items():
        if hasattr(mod, key):
            setattr(mod, key, value)
    return mod


def world_bbox(obj):
    coords = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
    mins = Vector((min(c.x for c in coords), min(c.y for c in coords), min(c.z for c in coords)))
    maxs = Vector((max(c.x for c in coords), max(c.y for c in coords), max(c.z for c in coords)))
    return mins, maxs


set_object_mode()

bread_mat = make_mat("Golden donut dough", (0.86, 0.48, 0.18, 1), 0.72)
icing_mat = make_mat("Glossy strawberry icing", (1.0, 0.39, 0.58, 1), 0.28)
cup_mat = make_mat("Warm white ceramic", (0.95, 0.91, 0.84, 1), 0.34)
coffee_mat = make_mat("Coffee surface", (0.12, 0.06, 0.025, 1), 0.55)
table_mat = make_mat("Warm wooden table", (0.48, 0.28, 0.13, 1), 0.65)
steam_mat = make_mat("Soft steam", (0.9, 0.96, 1.0, 0.32), 0.12)

donut = bpy.data.objects.get("Torus")
cup = bpy.data.objects.get("Cylinder")

if donut:
    donut.name = "Donut"
    donut.location = (-1.35, 0.0, 0.36)
    assign_mat(donut, bread_mat)
    shade_smooth(donut)
    add_modifier(donut, "BEVEL", "soft rounded dough", width=0.025, segments=4)
    add_modifier(donut, "SUBSURF", "smooth dough", levels=1, render_levels=1)

if cup:
    cup.name = "Coffee Cup"
    cup.location = (0.85, 0.0, 0.55)
    assign_mat(cup, cup_mat)
    shade_smooth(cup)
    add_modifier(cup, "SOLIDIFY", "ceramic thickness", thickness=0.045, offset=0)
    add_modifier(cup, "BEVEL", "rounded ceramic edges", width=0.035, segments=5)
    add_modifier(cup, "WEIGHTED_NORMAL", "clean ceramic normals")

# Add a dedicated smooth handle so the cup reads clearly in the render.
if cup and not bpy.data.objects.get("Rounded Cup Handle"):
    curve = bpy.data.curves.new("Rounded Cup Handle", "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 24
    curve.bevel_depth = 0.055
    curve.bevel_resolution = 7
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(3)
    points = [
        (1.35, 0.0, 0.92),
        (1.83, 0.0, 0.82),
        (1.84, 0.0, 0.38),
        (1.34, 0.0, 0.34),
    ]
    for point, co in zip(spline.bezier_points, points):
        point.co = co
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"
    handle = bpy.data.objects.new("Rounded Cup Handle", curve)
    bpy.context.collection.objects.link(handle)
    handle.data.materials.append(cup_mat)

# Coffee surface inside the cup.
if cup and not bpy.data.objects.get("Coffee Fill"):
    bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=0.43, depth=0.018, location=(0.85, 0.0, 1.13))
    coffee = bpy.context.object
    coffee.name = "Coffee Fill"
    assign_mat(coffee, coffee_mat)
    shade_smooth(coffee)

# Icing is a slightly smaller torus lifted onto the dough.
if donut and not bpy.data.objects.get("Strawberry Icing"):
    bpy.ops.mesh.primitive_torus_add(
        major_segments=160,
        minor_segments=32,
        major_radius=0.55,
        minor_radius=0.15,
        location=(-1.35, 0.0, 0.49),
    )
    icing = bpy.context.object
    icing.name = "Strawberry Icing"
    icing.scale = (1.0, 1.0, 0.38)
    assign_mat(icing, icing_mat)
    shade_smooth(icing)

# Sprinkles.
sprinkle_mats = [
    make_mat("Sprinkle lemon", (1.0, 0.86, 0.16, 1), 0.42),
    make_mat("Sprinkle mint", (0.22, 0.85, 0.56, 1), 0.42),
    make_mat("Sprinkle vanilla", (1.0, 0.96, 0.78, 1), 0.42),
    make_mat("Sprinkle blueberry", (0.24, 0.48, 1.0, 1), 0.42),
]
if not bpy.data.collections.get("Sprinkles"):
    sprinkle_col = bpy.data.collections.new("Sprinkles")
    bpy.context.scene.collection.children.link(sprinkle_col)
    random.seed(8)
    for index in range(42):
        angle = random.uniform(0, math.tau)
        ring = random.uniform(0.39, 0.69)
        x = -1.35 + math.cos(angle) * ring
        y = math.sin(angle) * ring
        z = 0.57 + random.uniform(-0.012, 0.035)
        bpy.ops.mesh.primitive_cylinder_add(vertices=10, radius=0.018, depth=0.16, location=(x, y, z))
        sprinkle = bpy.context.object
        sprinkle.name = f"Sprinkle {index + 1:02d}"
        sprinkle.rotation_euler = (
            random.uniform(1.05, 1.42),
            random.uniform(-0.35, 0.35),
            angle + random.uniform(-0.9, 0.9),
        )
        assign_mat(sprinkle, random.choice(sprinkle_mats))
        shade_smooth(sprinkle)
        for collection in sprinkle.users_collection:
            collection.objects.unlink(sprinkle)
        sprinkle_col.objects.link(sprinkle)

# Steam as soft curves above the cup.
if not bpy.data.collections.get("Steam"):
    steam_col = bpy.data.collections.new("Steam")
    bpy.context.scene.collection.children.link(steam_col)
    for index, x_offset in enumerate([-0.15, 0.0, 0.14]):
        curve = bpy.data.curves.new(f"Steam Curl {index + 1}", "CURVE")
        curve.dimensions = "3D"
        curve.resolution_u = 28
        curve.bevel_depth = 0.012
        curve.bevel_resolution = 3
        spline = curve.splines.new("BEZIER")
        spline.bezier_points.add(3)
        coords = [
            (0.85 + x_offset, 0.0, 1.22),
            (0.72 + x_offset, 0.08, 1.48),
            (0.98 + x_offset, -0.07, 1.7),
            (0.82 + x_offset, 0.03, 1.95),
        ]
        for point, co in zip(spline.bezier_points, coords):
            point.co = co
            point.handle_left_type = "AUTO"
            point.handle_right_type = "AUTO"
        obj = bpy.data.objects.new(curve.name, curve)
        obj.data.materials.append(steam_mat)
        steam_col.objects.link(obj)

# Table and soft background.
if not bpy.data.objects.get("Wood Table"):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.15, 0, -0.08))
    table = bpy.context.object
    table.name = "Wood Table"
    table.dimensions = (5.2, 3.2, 0.16)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    assign_mat(table, table_mat)

if not bpy.data.objects.get("Warm Backdrop"):
    bpy.ops.mesh.primitive_plane_add(size=5.2, location=(0, 1.65, 1.8), rotation=(math.radians(90), 0, 0))
    backdrop = bpy.context.object
    backdrop.name = "Warm Backdrop"
    assign_mat(backdrop, make_mat("Matte cream backdrop", (0.78, 0.70, 0.62, 1), 0.8))

# Replace simple light setup with a soft render setup.
for obj in list(bpy.data.objects):
    if obj.type == "LIGHT":
        bpy.data.objects.remove(obj, do_unlink=True)

bpy.ops.object.light_add(type="AREA", location=(-2.2, -2.5, 4.2))
key = bpy.context.object
key.name = "Large Softbox Key Light"
key.data.energy = 520
key.data.size = 4.0

bpy.ops.object.light_add(type="POINT", location=(2.5, 1.5, 2.0))
rim = bpy.context.object
rim.name = "Warm Rim Light"
rim.data.energy = 45
rim.data.color = (1.0, 0.78, 0.55)

# Camera composition.
camera = bpy.data.objects.get("Camera")
if not camera:
    bpy.ops.object.camera_add()
    camera = bpy.context.object
camera.location = (0.05, -4.2, 1.75)
camera.rotation_euler = (math.radians(72), 0, math.radians(1))
camera.data.lens = 50
camera.data.dof.use_dof = True
camera.data.dof.focus_distance = 4.0
camera.data.dof.aperture_fstop = 5.6
bpy.context.scene.camera = camera

# Render settings.
bpy.context.scene.render.engine = "CYCLES"
bpy.context.scene.cycles.samples = 128
bpy.context.scene.cycles.use_denoising = True
bpy.context.scene.render.resolution_x = 1920
bpy.context.scene.render.resolution_y = 1080
bpy.context.scene.view_settings.view_transform = "Filmic"
bpy.context.scene.view_settings.look = "Medium High Contrast"
bpy.context.scene.view_settings.exposure = 0
bpy.context.scene.view_settings.gamma = 1

bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT))
