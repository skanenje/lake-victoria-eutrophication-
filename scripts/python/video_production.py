"""Simple video composer that stitches frames into a video using moviepy.

Expect directory structure:
 - spatial_frames/ (png frames)
 - output/ (video output)
"""
import os
from moviepy.editor import ImageSequenceClip


def frames_to_video(frames_dir='spatial_frames', out='output/lake_victoria_eutrophication.mp4', fps=6):
    if not os.path.exists(frames_dir):
        raise FileNotFoundError(f'Frames directory not found: {frames_dir}')
    frames = sorted([os.path.join(frames_dir, f) for f in os.listdir(frames_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
    if not frames:
        raise FileNotFoundError('No image frames found in ' + frames_dir)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    clip = ImageSequenceClip(frames, fps=fps)
    clip.write_videofile(out, codec='libx264')
    print('Video written to', out)


if __name__ == '__main__':
    frames_to_video()
