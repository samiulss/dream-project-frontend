import { ShareSocial } from 'react-share-social';

export default function ShareContentLink({ path }) {
  const style = {
    root: {
      borderRadius: 3,
      border: 0,
      padding: 0

    },
    copyContainer: {
      background: 'rgb(0,0,0,0.7)'
    },
    title: {
      color: 'aquamarine',
      fontStyle: 'italic'
    }
  };
  return (
    <ShareSocial
      title="Share"
      url={`https://dream-project.netlify.app/${path}`}
      socialTypes={['whatsapp', 'telegram', 'facebook', 'twitter', 'reddit', 'linkedin',]}
      style={style}
    />
  );
}
