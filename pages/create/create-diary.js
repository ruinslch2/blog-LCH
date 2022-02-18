import dynamic from 'next/dynamic'
import React, { useState } from "react";
import Layout from '../../components/layout'
import Container from '../../components/container'
import Head from 'next/head'
import Button from '@material-ui/core/Button';

const CreateDiary = dynamic(
    () => import('../../components/create-diary'),
    { ssr: false }
  )

 async function postDiary(title, value) {
    console.log("3: ", value)
    const data = {
        title: title,
        content: value,
    }
    await fetch('http://54.146.176.96:3000/api/postDiary', {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(response => response.json()).then(result => {
        console.log('result: ', result);
        console.log("5")
    }).catch(error => {
        console.log("6")
    })
    console.log("4")
}

export default function CreatePost() {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    console.log('value::: ', value)
    return (
        <Layout>
            <Container>
                <Head>
                    <title>
                        新增日記
                    </title>
                    {/* <meta property="og:image" content={post.ogImage.url} /> */}
                </Head>
                <label>標題</label>
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                <CreateDiary content={value} setValue={setValue}/>
                <Button
                    onClick={() => {
                        console.log('final value: ', value)
                        postDiary(title, value);
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