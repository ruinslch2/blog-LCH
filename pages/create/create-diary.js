import dynamic from 'next/dynamic'
import React, { useState } from "react";
import Layout from '../../components/layout'
import Container from '../../components/container'
import Head from 'next/head'
const CreateDiary = dynamic(
    () => import('../../components/create-diary'),
    { ssr: false }
  )

export default function CreatePost() {
    const [value, setValue] = useState('');
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
                <CreateDiary content={value} setValue={setValue}/>
            </Container>
        </Layout>
    )
}