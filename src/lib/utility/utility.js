import moment from 'moment';

/* Convert File Size for human-readable  */
export const humanSize = (size) => {
  const num = size == 0 ? 0 : Math.floor( Math.log(size) / Math.log(1024));
  return ( size / Math.pow(1024, num) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][num];
}

/* Convert UNIX Time Stamp to ISO DATE and Date Format */
export const getDateFromTimeStamp = (timestamp) => {
  return moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

export const getDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
}


export const extractNameAndTag = (imageName, registry) => {
  /* imageName.image = post body value */
  const imageNameAndTag = imageName.image.split(':');
  let image = imageNameAndTag[0];
  const tag = imageNameAndTag[1] ? imageNameAndTag[1] : 'latest';
  if (registry) {
      image = registry + '/' + imageNameAndTag[0];
    }

    return {
      image: image,
      tag: tag
    };
}

export const extractRepoAndTag = (tagName) => {
  const imageRepoAndTag = extractNameAndTag(tagName);

  return {
    repo: imageRepoAndTag.image,
    tag: imageRepoAndTag.tag
  };
}
