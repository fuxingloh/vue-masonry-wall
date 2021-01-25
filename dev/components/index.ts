import Empty from './empty.vue';
import Basic from './basic.vue';

export interface ComponentMeta {
  path: string;
  name: string;
  description: string;
  component: any;
}

const components: ComponentMeta[] = [
  {
    path: '/empty',
    name: 'empty',
    description: 'No content, for testing. Below should be empty.',
    component: Empty,
  },
  {
    path: '/basic',
    name: 'basic',
    description: 'Basic content.',
    component: Basic,
  },
]

export default components
