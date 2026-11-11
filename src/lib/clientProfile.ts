export type ClientId = 'default' | 'moshia';

/**
 * Resolve qual perfil de cliente deve ser exibido conforme URL, query string ou build standalone.
 */
export function resolveClientId(
  pathname: string,
  search: string,
  envDefaultClient?: string
): ClientId {
  const params = new URLSearchParams(search);
  const queryClient = (params.get('cliente') ?? params.get('client') ?? '').toLowerCase();
  if (queryClient === 'moshia') {
    return 'moshia';
  }
  if (queryClient === 'default' || queryClient === 'innovary') {
    return 'default';
  }

  const normalizedPath = pathname.toLowerCase().replace(/\/+$/, '');
  if (
    normalizedPath === '/moshia' ||
    normalizedPath.endsWith('/moshia')
  ) {
    return 'moshia';
  }

  if (envDefaultClient?.toLowerCase() === 'moshia') {
    return 'moshia';
  }

  return 'default';
}
