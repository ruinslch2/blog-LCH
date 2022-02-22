import dynamic from 'next/dynamic'
import React, { useState } from "react";
import Layout from '../../components/layout'
import Container from '../../components/container'
import { Grid } from '@nextui-org/react';
import Header from '../../components/header'
import Head from 'next/head'
import Button from '@material-ui/core/Button';

const CreateDiary = dynamic(
    () => import('../../components/create-diary'),
    { ssr: false }
  )

 async function postDiary(state, value) {
    const data = {
        title: state.title,
        coverImg: state.coverImg,
        content: value,
    }
    await fetch('http://54.146.176.96:3000//api/postDiary', {
        method: 'POST',
        body: JSON.stringify(data),

    }).then(response => response.json()).then(result => {
        console.log('result: ', result);
    }).catch(error => {
    })
}

export default function CreatePost() {
    const [value, setValue] = useState('');
    const [state, setState] = useState({title: '', coverImg: ''});
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
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
                        <label>標題</label>
                        <input style={{ marginLeft: '2%', border: '1px solid black' }} type="text" name="title" onChange={(e) => handleChange(e)} />
                    </Grid>
                    <Grid item xs={12}>
                        <label>封面圖片</label>
                        <input style={{ margin: '2%', border: '1px solid black' }} type="text" name="coverImg" onChange={(e) => handleChange(e)} />
                    </Grid>
                </Grid>
                
                <CreateDiary content={value} setValue={setValue}/>
                <Button
                    onClick={() => {
                        postDiary(state, value);
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