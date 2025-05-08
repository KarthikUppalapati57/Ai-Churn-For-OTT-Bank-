import pandas as pd
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis as LDA
from tkinter import Tk, filedialog

# Function to upload file
def upload_file():
    """Open a file dialog to select the preprocessed Bank dataset."""
    Tk().withdraw()  # Hide the root Tkinter window
    file_path = filedialog.askopenfilename(filetypes=[("CSV files", "*.csv")])
    
    if file_path:
        print(f"\n✅ File Selected: {file_path}")
        return file_path
    else:
        print("\n❌ No file selected. Please try again.")
        exit()

# Upload dataset using file dialog
file_path = upload_file()

# Load the preprocessed Bank dataset
df = pd.read_csv(file_path)
print("\n📂 Preprocessed Bank Dataset Loaded!\n")

# Define Features (X) and Target (y)
X = df.drop(columns=['Exited', 'CustomerId', 'RowNumber', 'Surname'])  # Remove non-relevant columns
y = df['Exited']  # Target variable (Churn: 0 or 1)

# Apply PCA for 3D visualization
pca = PCA(n_components=3)
X_pca = pca.fit_transform(X)

# Apply t-SNE for 3D visualization
tsne = TSNE(n_components=3, random_state=42)
X_tsne = tsne.fit_transform(X)

# Apply LDA for 2D visualization (since only 1 component is allowed)
lda = LDA(n_components=1)
X_lda = lda.fit_transform(X, y)

# Plot 3D PCA Visualization
fig = plt.figure(figsize=(18, 6))

ax1 = fig.add_subplot(131, projection='3d')
ax1.scatter(X_pca[:, 0], X_pca[:, 1], X_pca[:, 2], c=y, cmap='coolwarm', alpha=0.7)
ax1.set_title("3D PCA Visualization")
ax1.set_xlabel("PC1")
ax1.set_ylabel("PC2")
ax1.set_zlabel("PC3")

# Plot 3D t-SNE Visualization
ax2 = fig.add_subplot(132, projection='3d')
ax2.scatter(X_tsne[:, 0], X_tsne[:, 1], X_tsne[:, 2], c=y, cmap='coolwarm', alpha=0.7)
ax2.set_title("3D t-SNE Visualization")
ax2.set_xlabel("tSNE1")
ax2.set_ylabel("tSNE2")
ax2.set_zlabel("tSNE3")


ax3 = fig.add_subplot(133)
ax3.scatter(X_lda[:, 0], [0] * len(X_lda), c=y, cmap='coolwarm', alpha=0.7)
ax3.set_title("2D LDA Visualization")
ax3.set_xlabel("LDA1")
ax3.set_yticks([])  

plt.show(block=True)  