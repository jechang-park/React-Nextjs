import React, { useState, useEffect } from "react";
import { Table, Container, Button } from 'semantic-ui-react'
import Link from 'next/link';
import {useRouter} from 'next/router'







const board = (props) => {
  const router = useRouter();

  const onClickDetail = e => {
    router.push(`/board/${e.target.getAttribute('data-id')}`);
}


  return (
    <Container>    
      <p>
        <Link href="/board/add">글 작성</Link>
      </p>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>제목</Table.HeaderCell>
            <Table.HeaderCell>작성날짜</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        {props.BoardInfo && props.BoardInfo.data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((item, index) => {

        return (
    <Table.Row >
      <Table.Cell>{item.title}</Table.Cell>
      <Table.Cell>{item.createdAt}</Table.Cell>
      <Table.Cell>   
        <Button style={{ margin: "2px" }} color='vk' data-id={item._id} onClick={(e) => {
                  onClickDetail(e);
          }}>내용보기</Button>
          </Table.Cell>

    </Table.Row>
  );
})}

        </Table.Body>
      </Table>
    </Container>
  )
}

export default board;

export const getServerSideProps = async (context) => {
  const BoardInfo = await fetch(`http://localhost:8080/board/add`, {
    method: 'GET',
  }).then(res => res.json());
  console.log("조회 데이터", BoardInfo.data)

  return {
    props: {
      BoardInfo,
    },
  };
};
