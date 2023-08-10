import React, { useState, useEffect } from "react";
import { Table, Container, Button } from 'semantic-ui-react'
import Link from 'next/link';
import {useRouter} from 'next/router'







const board = (props) => {
  const router = useRouter();

  const onClickDetail = e => {
    router.push(`/board/${e.target.getAttribute('data-id')}`);
}


const returnCorrectDate = d => {
  const tempDate = new Date(new Date(d).getTime() + 0);
  const tempString = tempDate.getFullYear() + '-'
      + returnDigitDual(tempDate.getMonth() + 1) + '-'
      + returnDigitDual(tempDate.getDate()) + '('
      + returnWeek(tempDate.getDay()) + ') '
      + returnDigitDual(tempDate.getHours()) + ':'
      + returnDigitDual(tempDate.getMinutes());
  return tempString;
}
const returnWeek = s => {
  switch (s) {
      case 0: return "일";
      case 1: return "월";
      case 2: return "화";
      case 3: return "수";
      case 4: return "목";
      case 5: return "금";
      case 6: return "토";
  }
}
const returnDigitDual = n => {
  if (n < 10) {
      return "0" + n;
  } else {
      return n;
  }
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
      <Table.Cell>{returnCorrectDate(item.createdAt)}</Table.Cell>
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
