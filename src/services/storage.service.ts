import axios from "axios";

/* ------------------ CONFIG ------------------ */

// Prefer env variable, fallback for local dev
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:3000/api/resources";

/* ------------------ TYPES ------------------ */

// Raw object returned by backend (S3 format)
export interface S3DocumentRaw {
  Key: string;
  LastModified: string;
  Size: number;
  ETag: string;
}

// UI-friendly document shape
export interface S3Document {
  id: string;
  name: string;
  size: string;
  type: string;
  date: string;
  key:string
}

/* ------------------ HELPERS ------------------ */

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const mapS3ToDocument = (doc: S3DocumentRaw): S3Document => {
  const fileName = doc.Key.split("/").pop() ?? doc.Key;
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "file";

  return {
    id: doc.ETag,
    name: fileName,
    type: ext,
    size: formatFileSize(doc.Size),
    date: new Date(doc.LastModified).toISOString().split("T")[0],
    key: doc.Key,   
  };
};

/* ------------------ SERVICE ------------------ */

export const StorageService = {
  /**
   * Upload a document for a tenant
   */
  uploadDocument: async (
    file: File,
    tenantId: string,
    role: string,
    token: string
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tenantId", tenantId);
    formData.append("role", role);

    await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Fetch all documents for a tenant (role filtered)
   */
  getDocuments: async (
    tenantId: string,
    role: string,
    token: string
  ): Promise<S3Document[]> => {
    const response = await axios.get<S3DocumentRaw[]>(API_BASE_URL, {
      params: { tenantId, role },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.map(mapS3ToDocument);
  },

  downloadDocument: async (tenantId: string, role: string, key: string , token :any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/download`, {
        params: { tenantId, role, key },
        responseType: "blob", // CRITICAL: Tells Axios to treat response as binary data
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Extract filename from the key (e.g., "admin/123-file.pdf" -> "123-file.pdf")
      const fileName = key.split("/").pop() || "download";

      // Create a hidden link and click it to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      throw new Error("Could not download file.");
    }
  },

  deleteDocument: async (tenantId: string, role: string, key: string , token:any) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete`, {
        params: { tenantId, role, key },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Delete failed:", error);
      throw new Error("Could not delete file.");
    }
  }
};
