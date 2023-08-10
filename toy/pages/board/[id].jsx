
import React, { useEffect, useState } from 'react'
import { Form,  Table } from 'semantic-ui-react'



const boardDetail = (props) => {


  const [form, setForm] = useState({
    
});

return(
<Table definition>
<Table.Body>
    <Table.Row>
    <Table.Cell>제목</Table.Cell>
    <Table.Cell>내용</Table.Cell>
    </Table.Row>
</Table.Body>
<Table.Body>
    <Table.Row>
    <Table.Cell>
    <Form.Input
                                        // readOnly
                                        label="제목"
                                        name="title"
                                        value={form.title}
                                        onChange={e => { setForm({ ...form, [e.target.name]: e.target.value }) }} />
    </Table.Cell>
    <Table.Cell>
    <Form.TextArea
                                        label="내용"
                                        style={{
                                            height: "400px",
                                        }}
                                        name="content"
                                        value={form.content}
                                        onChange={(e) => { setForm({ ...form, [e.target.name]: e.target.value }) }}
                                    />
    </Table.Cell>
    </Table.Row>
</Table.Body>
</Table>
)
  
}

export default boardDetail


export const getServerSideProps = async (context) => {
  const BoardId = await fetch(`http://localhost:8080/board/${context.query.id}`, {
    method: 'GET',
  
  }).then(res => res.json());
  console.log("_id로 Data 조회", BoardId);

  return {
    props: {
      BoardId,
    },
  };
};

