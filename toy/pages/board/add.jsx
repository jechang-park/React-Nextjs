import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Input, Container, TextArea, Table } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';


const add = () => {
  const [isLoader, setIsLoader] = useState(false);
  const router = useRouter();
  const Editor = dynamic(() => import('../../components/editor'), { ssr: false });
  const [editorLoaded, setEditorLoaded] = useState(false);
  const resultView = useRef(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
  });



  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const createNotice = async () => {
    try {
      setIsLoader(true);
      const res = await fetch(`http://localhost:8080/board/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const content = await res.json();
      if (content.success) {
        setIsLoader(false);
        router.push('/board');
        console.log(content.data)
      } else {
        setIsLoader(false);
        alert(content.message);
      }
    } catch (error) {
      setIsLoader(false);
      console.log(error);
    }
  }


  return (
    <Container>
      <Form onSubmit={() => {
        createNotice();
      }}>
        <Form.Input
          label="제목"
          placeholder="제목을 입력하세요."
          name="title"
          onChange={e => { setForm({ ...form, [e.target.name]: e.target.value }) }} />
        {/* <Form.TextArea
          label="내용"
          placeholder="내용을 입력하세요."
          style={{ height: "300px" }}
          name="content"
          onChange={(e) => { setForm({ ...form, [e.target.name]: e.target.value }) }}
        /> */}
        <Editor
          name="content"
          editorLoaded={editorLoaded}
          onChange={e => { setForm({ ...form, [e.target.name]: e.target.value }) }}
        />
        <div ref={resultView} />
        <Button style={{ width: '300px', height: '50px' }} type='submit'>제출</Button>
      </Form>
    </Container>
  )
}

export default add;