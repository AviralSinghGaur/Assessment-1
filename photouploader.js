// PhotoUploader.js//
import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AWS_S3_UPLOAD_URL = 'YOUR_AWS_S3_UPLOAD_URL';

const PhotoUploader = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      uploadToS3(result.uri);
    }
  };

  const uploadToS3 = async (uri) => {
    try {
      let response = await fetch(uri);
      let blob = await response.blob();

      let formData = new FormData();
      formData.append('file', blob);

      await axios.post(AWS_S3_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded to AWS S3 successfully!');
    } catch (error) {
      console.error('Error uploading image to AWS S3:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 20 }} />}
      <Button title="Take Photo" onPress={pickImage} />
    </View>
  );
};

export default PhotoUploader;
