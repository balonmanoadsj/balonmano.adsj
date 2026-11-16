export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  iconLink?: string;
  webViewLink?: string;
  thumbnailLink?: string;
  modifiedTime?: string;
  size?: string;
  category?: 'calendario' | 'actas' | 'convocatoria' | 'medico' | 'reglamento' | 'otro';
  isLocalSeed?: boolean;
}

// Model documents for AD San Juan Balonmano (displayed as official section templates)
export const SEED_SECTION_DOCUMENTS: DriveFileItem[] = [
  {
    id: 'doc-cal-2025',
    name: 'Calendario_Temporada_Balonmano_Femenino_2024_2025_AD_San_Juan.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    modifiedTime: '2025-02-14T10:30:00Z',
    size: '148000',
    category: 'calendario',
    isLocalSeed: true,
    webViewLink: 'https://docs.google.com/spreadsheets',
  },
  {
    id: 'doc-entrena-2025',
    name: 'Cuadrante_Pistas_y_Entrenamientos_Polideportivo_San_Juan.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    modifiedTime: '2025-02-18T18:00:00Z',
    size: '95400',
    category: 'calendario',
    isLocalSeed: true,
    webViewLink: 'https://docs.google.com/spreadsheets',
  },
  {
    id: 'doc-conv-sen',
    name: 'Plantilla_Convocatorias_Partidos_Senior_y_Base_ADSJ.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    modifiedTime: '2025-02-10T12:15:00Z',
    size: '64200',
    category: 'convocatoria',
    isLocalSeed: true,
    webViewLink: 'https://docs.google.com/document',
  },
  {
    id: 'doc-med-fnbm',
    name: 'Ficha_Medica_y_Autorizacion_Menores_FNBM_2024_25.pdf',
    mimeType: 'application/pdf',
    modifiedTime: '2025-01-20T09:00:00Z',
    size: '420500',
    category: 'medico',
    isLocalSeed: true,
    webViewLink: 'https://drive.google.com',
  },
  {
    id: 'doc-acta-oficial',
    name: 'Modelo_Acta_Oficial_Mesa_de_Anotadores_AD_San_Juan.pdf',
    mimeType: 'application/pdf',
    modifiedTime: '2025-01-15T16:20:00Z',
    size: '310200',
    category: 'actas',
    isLocalSeed: true,
    webViewLink: 'https://drive.google.com',
  },
  {
    id: 'doc-reg-interno',
    name: 'Reglamento_Interno_y_Codigos_de_Conducta_Eskubaloia_Donibane.pdf',
    mimeType: 'application/pdf',
    modifiedTime: '2024-11-04T11:00:00Z',
    size: '540800',
    category: 'reglamento',
    isLocalSeed: true,
    webViewLink: 'https://drive.google.com',
  },
  {
    id: 'doc-auto-bus',
    name: 'Autorizacion_Paterna_Desplazamientos_Autobus_Equipos_Base.pdf',
    mimeType: 'application/pdf',
    modifiedTime: '2025-01-12T14:45:00Z',
    size: '185000',
    category: 'reglamento',
    isLocalSeed: true,
    webViewLink: 'https://drive.google.com',
  },
];

export async function fetchDriveFiles(accessToken: string, queryStr?: string): Promise<DriveFileItem[]> {
  try {
    let q = "trashed = false";
    if (queryStr && queryStr.trim().length > 0) {
      // Escape single quotes in query
      const safeQuery = queryStr.replace(/'/g, "\\'");
      q += ` and (name contains '${safeQuery}' or fullText contains '${safeQuery}')`;
    }

    const fields = 'files(id, name, mimeType, iconLink, webViewLink, thumbnailLink, modifiedTime, size)';
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.append('q', q);
    url.searchParams.append('fields', fields);
    url.searchParams.append('pageSize', '50');
    url.searchParams.append('orderBy', 'folder,modifiedTime desc');

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('Error fetching Google Drive files:', res.status, errBody);
      throw new Error(`Error en Google Drive: ${res.statusText}`);
    }

    const data = await res.json();
    const files: DriveFileItem[] = (data.files || []).map((file: any) => {
      let category: DriveFileItem['category'] = 'otro';
      const lower = file.name.toLowerCase();
      if (lower.includes('calen') || lower.includes('horar') || lower.includes('pista')) {
        category = 'calendario';
      } else if (lower.includes('acta') || lower.includes('partido') || lower.includes('resultado')) {
        category = 'actas';
      } else if (lower.includes('convoc')) {
        category = 'convocatoria';
      } else if (lower.includes('medic') || lower.includes('salud') || lower.includes('lesion')) {
        category = 'medico';
      } else if (lower.includes('regla') || lower.includes('norm') || lower.includes('auto')) {
        category = 'reglamento';
      }

      return {
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        iconLink: file.iconLink,
        webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
        thumbnailLink: file.thumbnailLink,
        modifiedTime: file.modifiedTime,
        size: file.size,
        category,
        isLocalSeed: false,
      };
    });

    return files;
  } catch (error) {
    console.error('Drive fetch error:', error);
    throw error;
  }
}

export function formatFileSize(bytes?: string | number): string {
  if (!bytes) return '—';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num)) return '—';
  if (num < 1024) return `${num} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  return `${(num / (1024 * 1024)).toFixed(1)} MB`;
}

export function getFileIconBadge(mimeType: string) {
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) {
    return { label: 'XLSX', color: 'bg-emerald-600 text-white', icon: 'Sheet' };
  }
  if (mimeType.includes('word') || mimeType.includes('document')) {
    return { label: 'DOCX', color: 'bg-blue-600 text-white', icon: 'FileText' };
  }
  if (mimeType.includes('pdf')) {
    return { label: 'PDF', color: 'bg-rose-600 text-white', icon: 'FileCode' };
  }
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
    return { label: 'PPTX', color: 'bg-amber-600 text-white', icon: 'Presentation' };
  }
  if (mimeType.includes('image')) {
    return { label: 'IMG', color: 'bg-purple-600 text-white', icon: 'Image' };
  }
  if (mimeType.includes('folder')) {
    return { label: 'CARPETA', color: 'bg-yellow-500 text-neutral-900', icon: 'Folder' };
  }
  return { label: 'DOC', color: 'bg-neutral-600 text-white', icon: 'File' };
}
