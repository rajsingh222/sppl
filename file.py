import os

def write_directory_structure(startpath, file, indent=""):
    for item in sorted(os.listdir(startpath)):
        path = os.path.join(startpath, item)
        if os.path.isdir(path):
            file.write(f"{indent}📁 {item}/\n")
            write_directory_structure(path, file, indent + "    ")
        else:
            file.write(f"{indent}📄 {item}\n")

# Example usage:
if __name__ == "__main__":
    folder_path = input("Enter the path of the folder: ").strip()
    if os.path.exists(folder_path) and os.path.isdir(folder_path):
        output_file = "folder_structure.txt"
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(f"Folder structure of: {folder_path}\n\n")
            write_directory_structure(folder_path, f)
        print(f"\n✅ Folder structure written to '{output_file}'")
    else:
        print("❌ Invalid folder path.")




