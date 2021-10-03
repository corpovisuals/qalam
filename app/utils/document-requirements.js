import settings from './document-settings';

export default function documentRequirements({ model, attr = 'document' }) {
  return { ...settings.document, ...settings[model][attr] };
}
