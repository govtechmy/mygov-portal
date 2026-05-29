import type { CollectionConfig } from 'payload';

import { Users } from './Users';
import { Media } from './Media';
import { Faq } from './Faq';
import { Features } from './Features';
import { Blog } from './Blog';

export { Users, Media, Faq, Features, Blog };

const PayloadCollections: CollectionConfig[] = [Users, Media, Faq, Features, Blog];

export default PayloadCollections;
