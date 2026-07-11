import bpy

output = r"C:\Users\OCN\OneDrive\Pictures\3D with Blender\donut&cup_render_ready_preview.png"

bpy.context.scene.render.engine = "CYCLES"
bpy.context.scene.cycles.samples = 24
bpy.context.scene.cycles.use_denoising = True
bpy.context.scene.render.resolution_x = 960
bpy.context.scene.render.resolution_y = 540
bpy.context.scene.render.filepath = output

bpy.ops.render.render(write_still=True)
