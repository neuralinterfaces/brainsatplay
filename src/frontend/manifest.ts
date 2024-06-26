import { muse } from '../../packages/brainsatplay/src';

import { Device } from './types';
  
  export const devices: Device[] = [
    {
      name: 'Muse 2',
      cls: muse.MuseDevice,
    },
    {
      name: 'Muse S',
      cls: muse.MuseDevice,
    },
  
    // OpenBCI
    {
      name: 'OpenBCI Cyton',
      cls: {
        schema: {
          properties: {
            daisy: {
              title: 'With Daisy',
              type: 'boolean',
              default: false
            }
          }
        }
      }
    },
    {
      name: 'OpenBCI Ganglion',
      cls: {
        schema: {
          properties: {}
        }
      }
    },
  
    // Neurosity
    {
      name: "Neurosity Notion",
      cls: {
        schema: {
          properties: {}
        }
      }
    },
    {
      name: "Neurosity Crown",
      cls: {
        schema: {
          properties: {}
        }
      }
    },
  
    // FreeEEG32
    {
      name: "FreeEEG32",
      cls: {
        schema: {
          properties: {
            channels: {
              title: 'Channels',
              type: 'number',
              default: 19
            },
            optical: {
              title: 'Optical',
              type: 'boolean',
              default: false
            },
            ads131: {
              title: 'ADS131',
              type: 'boolean',
              default: false
            }
          }
        }
      }
    }
  ]