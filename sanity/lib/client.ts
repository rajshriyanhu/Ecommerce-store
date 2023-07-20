import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn, token } from '../env'
import { SanityClient } from 'sanity';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
})

const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn, // Set to false if you want to retrieve the latest data
};
const sanityClient: SanityClient = createClient(config);

const config2 = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token,
}

const sanityClientUser: SanityClient = createClient(config2);

export {sanityClient, sanityClientUser};