// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import { loadEnv } from 'vite';

import react from '@astrojs/react';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['sanity', '@sanity/ui', '@sanity/icons'],
    },
  },
  integrations: [sanity({
    projectId: env.PUBLIC_SANITY_PROJECT_ID,
    dataset: env.PUBLIC_SANITY_DATASET ?? 'production',
    useCdn: false,
    studioBasePath: '/studio',
  }), react()],
});