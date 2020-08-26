import React from "react";
import { withLayout } from "../../layout";
import { Tag, Space, Button } from "antd";
import KTable from "../../components/table";
import styles from "./index.module.scss";
import SubHeader from "../../components/sub-header";
import { PlusOutlined } from "@ant-design/icons";
import Svg from "../../components/Svg";
function Order() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_text: string, record: { name: string }) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div className={styles.order}>
      <SubHeader title="订单">
        <Button type="primary" icon={<PlusOutlined />} size="large">
          创建订单
        </Button>
        <Button
          icon={<Svg name="ico-search-h" offsetX="-2" offsetY="2" />}
          size="large"
        />
      </SubHeader>
      <KTable
        columns={columns}
        data={data}
        currentPage={1}
        total={data.length}
      />
    </div>
  );
}
export default withLayout(Order);
