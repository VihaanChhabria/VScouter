import pandas as pd
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
from sklearn.cluster import KMeans
from PIL import Image
import numpy as np
from mpl_toolkits import mplot3d

import matplotlib.pyplot as plt

image_path = 'analysis/IMG_9363.jpeg'  # Update with your image path
image = Image.open(image_path)

# Convert the image to RGB and get the pixel values
image = image.convert('RGB')
data = np.array(image)

pixels = data.reshape(-1, 3)

home_data = pd.DataFrame(pixels, columns=['R', 'G', 'B'])
home_data = home_data.groupby(['R', 'G', 'B']).size().reset_index(name='Count')
home_data.head()

kmeans = KMeans(n_clusters=4, random_state=0, n_init='auto')
kmeans.fit(home_data)

fig = plt.figure()
ax = plt.axes(projection='3d')

# Get the cluster centers for plotting
xdata = kmeans.cluster_centers_[:, 0]
ydata = kmeans.cluster_centers_[:, 1]
zdata = kmeans.cluster_centers_[:, 2]

# Create an array of colors based on the RGB values
colors = np.array([xdata, ydata, zdata]).T / 255  # Normalize to [0, 1] for matplotlib

# Plot all RGB values
ax.scatter3D(home_data['R'], home_data['G'], home_data['B'], c='lightgray', alpha=0.5, s=1)

# Plot the cluster centers
ax.scatter3D(xdata, ydata, zdata, c=colors, s=100)

# Set the limits for x, y, and z axes
ax.set_xlim(0, 255)
ax.set_ylim(0, 255)
ax.set_zlim(0, 255)

# plt.show()
# Create an image to display the cluster colors
cluster_colors = (colors * 255).astype(int)  # Convert back to [0, 255] for image creation
color_image = np.zeros((100, len(cluster_colors)*100, 3), dtype=np.uint8)

# Fill the image with the cluster colors
for i in range(len(cluster_colors)):
    color_image[:, i * 100:(i + 1) * 100] = cluster_colors[i]

# Save the image
color_image_path = 'cluster_colors.png'
Image.fromarray(color_image).save(color_image_path)

print(f"Cluster colors image saved as {color_image_path}")