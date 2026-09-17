import { TeamData, MetadataArchive } from '../types';

/**
 * Service responsible solely for exporting and serializing architectural dossiers.
 */
export class ExportService {
  /**
   * Generates a formatted JSON string of all team matrices and telemetry data.
   */
  static generateDossierJSON(teams: TeamData[], metadata: MetadataArchive): string {
    return JSON.stringify(
      {
        archiveMetadata: metadata,
        extractedAt: new Date().toISOString(),
        nucleiCount: teams.length,
        teams,
      },
      null,
      2
    );
  }

  /**
   * Triggers a browser download of the architectural matrix as a JSON file.
   */
  static downloadDossierFile(teams: TeamData[], metadata: MetadataArchive, filename = '7-seeds-matriz-arquitetural.json'): boolean {
    try {
      const jsonStr = this.generateDossierJSON(teams, metadata);
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      console.error('Failed to export JSON dossier:', err);
      return false;
    }
  }

  /**
   * Copies formatted text to system clipboard with robust fallback for iframe environments.
   */
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      console.warn('Navigator clipboard writeText blocked, engaging fallback:', err);
    }

    try {
      if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      }
      return false;
    } catch (fallbackErr) {
      console.error('Clipboard fallback also failed:', fallbackErr);
      return false;
    }
  }
}
