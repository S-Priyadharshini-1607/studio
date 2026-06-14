/**
 * Services for Cloudinary Image Upload and Google Sheets Data Sync
 */

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
const GOOGLE_SHEET_API = import.meta.env.VITE_GOOGLE_SHEET_API;

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) throw new Error('Cloudinary upload failed');
    
    const data = await response.json();
    return data.secure_url; // The public URL of the uploaded image
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const syncWithGoogleSheets = async (imageData: { title: string, category: string, url: string }) => {
  try {
    // This assumes the VITE_GOOGLE_SHEET_API is a REST endpoint (SheetDB, Stein, or custom Apps Script)
    const response = await fetch(GOOGLE_SHEET_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    });

    if (!response.ok) throw new Error('Google Sheets sync failed');
    
    return await response.json();
  } catch (error) {
    console.error('Error syncing with Google Sheets:', error);
    throw error;
  }
};

export const deleteSheetItem = async (url: string) => {
  try {
    // SheetDB delete: DELETE /url/{value}
    const response = await fetch(`${GOOGLE_SHEET_API}/url/${encodeURIComponent(url)}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete item');
    return await response.json();
  } catch (error) {
    console.error('Error deleting from sheets:', error);
    throw error;
  }
};

export const updateSheetItem = async (oldUrl: string, newData: { title?: string, category?: string, url?: string }) => {
  try {
    // SheetDB update: PATCH /url/{value}
    const response = await fetch(`${GOOGLE_SHEET_API}/url/${encodeURIComponent(oldUrl)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [newData] }),
    });
    if (!response.ok) throw new Error('Failed to update item');
    return await response.json();
  } catch (error) {
    console.error('Error updating sheets:', error);
    throw error;
  }
};

export const fetchGalleryFromSheets = async () => {
  try {
    const response = await fetch(GOOGLE_SHEET_API);
    if (!response.ok) throw new Error('Failed to fetch gallery data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return []; // Return empty array if fetch fails
  }
};
