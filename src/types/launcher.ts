export interface VersionItem {
  id: string;
  type: 'release' | 'snapshot' | 'old_beta' | 'old_alpha';
  url: string;
  time: string;
  releaseTime: string;
  sha1: string;
}

export interface VersionManifest {
  latest: {
    release: string;
    snapshot: string;
  };
  versions: VersionItem[];
}

export interface UserProfile {
  uuid: string;
  username: string;
  access_token?: string;
  auth_type: 'Offline' | 'MicrosoftOAuth';
  skin_url?: string;
  cape_url?: string;
}

export interface Instance {
  id: string;
  name: string;
  version: string;
  loader: 'Vanilla' | 'Forge' | 'Fabric' | 'NeoForge' | 'Quilt';
  javaPath?: string;
  maxMemory: number;
}
