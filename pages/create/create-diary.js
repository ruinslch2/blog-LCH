import dynamic from 'next/dynamic'
import React, { useState } from "react";
import Layout from '../../components/layout'
import Container from '../../components/container'
import { Grid } from '@nextui-org/react';
import Header from '../../components/header'
import Head from 'next/head'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const CreateDiary = dynamic(
    () => import('../../components/create-diary'),
    { ssr: false }
)

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};


async function postDiary(state, value, progressVal, setProgress) {
    const obj = parseImgTag(value);
    const content = await uploadImg(obj, progressVal, setProgress);
    const data = {
        title: state.title,
        coverImg: content.coverImg,
        content: content.value,
    }
    await fetch(`http://${publicRuntimeConfig.public_url}:3000/api/postDiary`, {
        method: 'POST',
        body: JSON.stringify(data),

    }).then(response => response.json()).then(result => {
        console.log('result: ', result);
    }).catch(error => {
    })
}

function parseImgTag(str) {
    const regex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;
    let src;
    const imgStack = [];
    while((src = regex.exec(str)) != null) {
        imgStack.push(src[1])
    }
    
    return { content: str, imgContent: imgStack };
}

async function uploadImg(obj, progressVal, setProgress) { 
    const { imgContent } = obj;
    let { content } = obj;
    let coverImg;
    for (let i = 0; i < imgContent.length; i++) {
        const formData = new FormData();
        formData.append('upload_preset', publicRuntimeConfig.cloudinary.upload_preset);
        formData.append('file', imgContent[i]);
        formData.append('api_key', publicRuntimeConfig.cloudinary.api_key);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${publicRuntimeConfig.cloudinary.cloud_name}/image/upload`, {
            method: 'POST',
            body: formData
        })
        const file = await res.json();
        await setProgress(progressVal + 100.0/imgContent.length);

        content = content.replace(imgContent[i], file.eager[0].secure_url);
        if (i == 0) {
            coverImg = file.eager[0].secure_url;
        }
    }
    return {value: content, coverImg: coverImg};    
}

export default function CreatePost() {
    const [value, setValue] = useState('');
    const [state, setState] = useState({title: ''});
    const [progressVal, setProgress] = useState(0);

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    console.log('pro: ', progressVal)
    return (
        <Layout>
            <Head>
                <title>
                    新增日記
                </title>
            </Head>
            <Container>
                <Header />
                <Grid container>
                    <Grid item xs={12}>
                        <LinearProgressWithLabel value={progressVal} />
                        <label>標題</label>
                        <input style={{ marginLeft: '2%', border: '1px solid black' }} type="text" name="title" onChange={(e) => handleChange(e)} />
                    </Grid>
                </Grid>
                
                <CreateDiary content={value} setValue={setValue}/>
                <Button
                    onClick={() => {
                        postDiary(state, value, progressVal, setProgress);
                    }}
                    variant="contained"
                    color="secondary"
                    autoFocus
                >
                    送出
                </Button>
            </Container>
        </Layout>
    )
}