"use client";

import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Space,
  Popconfirm,
  Tag,
  Upload,
  message,
  Card,
  Row,
  Col,
  List,
  App
} from "antd";
import {
  PlayCircleOutlined,
  CommentOutlined,
  InstagramOutlined,
  BookOutlined,
  FileTextOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  DashboardOutlined,
  DatabaseOutlined
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function AdminPage() {
  const { message: msg } = App.useApp();
  const [activeTab, setActiveTab] = useState<string>("lessons");

  // Data states
  const [lessons, setLessons] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [decks, setDecks] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);

  // Loading states
  const [loading, setLoading] = useState<boolean>(false);

  // Modals state
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<any>(null);

  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<any>(null);

  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);

  // Upload helpers
  const [uploadLoading, setUploadLoading] = useState(false);

  // Forms
  const [lessonForm] = Form.useForm();
  const [storyForm] = Form.useForm();
  const [deckForm] = Form.useForm();
  const [examForm] = Form.useForm();

  // Fetching methods
  const fetchLessons = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/lessons`);
      const data = await res.json();
      if (res.ok) setLessons(data);
    } catch (e: any) {
      msg.error("Lỗi khi tải bài học");
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/comments`);
      const data = await res.json();
      if (res.ok) setComments(data);
    } catch (e: any) {
      msg.error("Lỗi khi tải bình luận");
    }
  };

  const fetchStories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/stories`);
      const data = await res.json();
      if (res.ok) setStories(data);
    } catch (e: any) {
      msg.error("Lỗi khi tải stories");
    }
  };

  const fetchDecks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/flashcards`);
      const data = await res.json();
      if (res.ok) setDecks(data);
    } catch (e: any) {
      msg.error("Lỗi khi tải bộ thẻ");
    }
  };

  const fetchExams = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/exams`);
      const data = await res.json();
      if (res.ok) setExams(data);
    } catch (e: any) {
      msg.error("Lỗi khi tải đề thi");
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchLessons(),
      fetchComments(),
      fetchStories(),
      fetchDecks(),
      fetchExams()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handle custom upload trigger
  const handleUpload = async (file: File, callback: (url: string) => void) => {
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        msg.success("Tải ảnh lên thành công!");
        callback(data.url);
      } else {
        msg.error(data.error || "Tải ảnh lên thất bại");
      }
    } catch (error) {
      msg.error("Có lỗi xảy ra khi upload");
    } finally {
      setUploadLoading(false);
    }
  };

  // Lesson CRUD
  const saveLesson = async (values: any) => {
    try {
      const isEdit = !!editingLesson;
      const url = `${API_BASE_URL}/api/lessons`;
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit ? { ...values, id: editingLesson.id } : values;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        msg.success(`${isEdit ? "Cập nhật" : "Tạo mới"} bài học thành công!`);
        setIsLessonModalOpen(false);
        setEditingLesson(null);
        lessonForm.resetFields();
        fetchLessons();
      } else {
        const err = await res.json();
        msg.error(err.error || "Không thể lưu bài học");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  const deleteLesson = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/lessons?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        msg.success("Xóa bài học thành công!");
        fetchLessons();
      } else {
        msg.error("Không thể xóa bài học");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  // Story CRUD
  const saveStory = async (values: any) => {
    try {
      const isEdit = !!editingStory;
      const url = `${API_BASE_URL}/api/stories`;
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit ? { ...values, id: editingStory.id } : values;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        msg.success(`${isEdit ? "Cập nhật" : "Tạo mới"} story thành công!`);
        setIsStoryModalOpen(false);
        setEditingStory(null);
        storyForm.resetFields();
        fetchStories();
      } else {
        const err = await res.json();
        msg.error(err.error || "Không thể lưu story");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  const deleteStory = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/stories?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        msg.success("Xóa story thành công!");
        fetchStories();
      } else {
        msg.error("Không thể xóa story");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  // Comment Delete
  const deleteComment = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/comments?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        msg.success("Xóa bình luận thành công!");
        fetchComments();
      } else {
        msg.error("Không thể xóa bình luận");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  // Flashcards CRUD
  const saveDeck = async (values: any) => {
    try {
      const isEdit = !!editingDeck;
      const url = `${API_BASE_URL}/api/flashcards`;
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit ? { ...values, id: editingDeck.id } : values;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        msg.success(`${isEdit ? "Cập nhật" : "Tạo mới"} bộ thẻ thành công!`);
        setIsDeckModalOpen(false);
        setEditingDeck(null);
        deckForm.resetFields();
        fetchDecks();
      } else {
        const err = await res.json();
        msg.error(err.error || "Không thể lưu bộ thẻ");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  const deleteDeck = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/flashcards?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        msg.success("Xóa bộ thẻ thành công!");
        fetchDecks();
      } else {
        msg.error("Không thể xóa bộ thẻ");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  // Exams CRUD
  const saveExam = async (values: any) => {
    try {
      const isEdit = !!editingExam;
      const url = `${API_BASE_URL}/api/exams`;
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit ? { ...values, id: editingExam.id } : values;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        msg.success(`${isEdit ? "Cập nhật" : "Tạo mới"} đề thi thành công!`);
        setIsExamModalOpen(false);
        setEditingExam(null);
        examForm.resetFields();
        fetchExams();
      } else {
        const err = await res.json();
        msg.error(err.error || "Không thể lưu đề thi");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  const deleteExam = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/exams?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        msg.success("Xóa đề thi thành công!");
        fetchExams();
      } else {
        msg.error("Không thể xóa đề thi");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  // Columns definition
  const lessonColumns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (src: string) => src ? <img src={src} alt="lesson thumb" style={{ width: 64, height: 36, objectFit: "cover", borderRadius: 4 }} /> : <Tag color="default">N/A</Tag>
    },
    { title: "Tiêu đề bài học", dataIndex: "title", key: "title" },
    { title: "Thời lượng", dataIndex: "duration", key: "duration" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setEditingLesson(record);
              lessonForm.setFieldsValue(record);
              setIsLessonModalOpen(true);
            }}
          />
          <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => deleteLesson(record.id)}>
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const commentColumns = [
    { title: "Học viên", dataIndex: "userName", key: "userName" },
    { title: "Nội dung", dataIndex: "content", key: "content" },
    { 
      title: "Bài học", 
      dataIndex: "lesson", 
      key: "lesson",
      render: (lesson: any) => lesson?.title || <Tag color="warning">Chưa gán</Tag>
    },
    {
      title: "Ngày bình luận",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString("vi-VN")
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Popconfirm title="Xóa bình luận này?" onConfirm={() => deleteComment(record.id)}>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      )
    }
  ];

  const storyColumns = [
    {
      title: "Story Image",
      dataIndex: "image",
      key: "image",
      render: (src: string) => <img src={src} alt="story content" style={{ width: 40, height: 60, objectFit: "cover", borderRadius: 4 }} />
    },
    { title: "Học viên", dataIndex: "name", key: "name" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setEditingStory(record);
              storyForm.setFieldsValue(record);
              setIsStoryModalOpen(true);
            }}
          />
          <Popconfirm title="Xóa story?" onConfirm={() => deleteStory(record.id)}>
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const deckColumns = [
    { title: "Tiêu đề bộ thẻ", dataIndex: "title", key: "title" },
    {
      title: "Danh mục",
      dataIndex: "categoryLabel",
      key: "categoryLabel",
      render: (label: string, record: any) => <Tag color="blue">{label} ({record.category})</Tag>
    },
    { title: "Số lượng thẻ", dataIndex: "cardCount", key: "cardCount" },
    {
      title: "Khóa học VIP",
      dataIndex: "isLocked",
      key: "isLocked",
      render: (locked: boolean) => locked ? <Tag color="red">Có</Tag> : <Tag color="green">Không</Tag>
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setEditingDeck(record);
              // Ensure cards exists or fallback to empty array
              const val = {
                ...record,
                cards: record.cards || []
              };
              deckForm.setFieldsValue(val);
              setIsDeckModalOpen(true);
            }}
          />
          <Popconfirm title="Xóa bộ thẻ này?" onConfirm={() => deleteDeck(record.id)}>
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const examColumns = [
    { title: "Tiêu đề đề thi", dataIndex: "title", key: "title" },
    {
      title: "Loại đề",
      dataIndex: "category",
      key: "category",
      render: (cat: string) => {
        const conf: Record<string, string> = {
          "school-exams": "Đề thi thử THPT",
          "mock-test": "Thi thử Online",
          "progress-test": "Đề luyện tập"
        };
        return <Tag color="purple">{conf[cat] || cat}</Tag>;
      }
    },
    { title: "Thời gian", dataIndex: "duration", key: "duration", render: (dur: number) => `${dur} phút` },
    { title: "Số câu hỏi", dataIndex: "cardCount", key: "cardCount" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setEditingExam(record);
              const val = {
                ...record,
                questions: record.questions || []
              };
              examForm.setFieldsValue(val);
              setIsExamModalOpen(true);
            }}
          />
          <Popconfirm title="Xóa đề thi?" onConfirm={() => deleteExam(record.id)}>
            <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const renderDashboardStats = () => {
    return (
      <div style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} md={4}>
            <Card style={{ textAlign: "center", borderLeft: "4px solid #0071f9" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Bài học</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{lessons.length}</div>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card style={{ textAlign: "center", borderLeft: "4px solid #f43f5e" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Bình luận</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{comments.length}</div>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card style={{ textAlign: "center", borderLeft: "4px solid #10b981" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Stories</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{stories.length}</div>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card style={{ textAlign: "center", borderLeft: "4px solid #eab308" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Bộ thẻ học</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{decks.length}</div>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card style={{ textAlign: "center", borderLeft: "4px solid #a855f7" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Bộ đề thi</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{exams.length}</div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar Sider */}
      <Sider width={220} theme="light" style={{ borderRight: "1px solid #ebf0f4" }}>
        <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #ebf0f4" }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#0071f9" }}>TD-ADMIN PANEL</div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={(e) => setActiveTab(e.key)}
          style={{ borderRight: 0, marginTop: 12 }}
          items={[
            { key: "lessons", icon: <PlayCircleOutlined />, label: "Bài học" },
            { key: "comments", icon: <CommentOutlined />, label: "Bình luận" },
            { key: "stories", icon: <InstagramOutlined />, label: "Stories" },
            { key: "flashcards", icon: <BookOutlined />, label: "Bộ thẻ từ vựng" },
            { key: "exams", icon: <FileTextOutlined />, label: "Đề thi & Câu hỏi" },
          ]}
        />
      </Sider>

      {/* Main Content Area */}
      <Layout>
        <Header style={{ background: "#fff", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ebf0f4" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1e293b" }}>
            {activeTab === "lessons" && "Quản lý Bài học video"}
            {activeTab === "comments" && "Quản lý Bình luận khóa học"}
            {activeTab === "stories" && "Quản lý Stories bảng tin"}
            {activeTab === "flashcards" && "Quản lý Bộ thẻ Flashcard học tập"}
            {activeTab === "exams" && "Quản lý Đề thi khảo sát & Đề thi thử"}
          </div>
          <Button type="primary" onClick={loadAllData} icon={<DatabaseOutlined />}>Đồng bộ DB</Button>
        </Header>

        <Content style={{ padding: 24, background: "#f8fafc" }}>
          {renderDashboardStats()}

          {/* Lessons view */}
          {activeTab === "lessons" && (
            <Card title="Danh sách Video bài giảng" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingLesson(null); lessonForm.resetFields(); setIsLessonModalOpen(true); }}>Thêm bài giảng mới</Button>}>
              <Table dataSource={lessons} columns={lessonColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} />
            </Card>
          )}

          {/* Comments view */}
          {activeTab === "comments" && (
            <Card title="Duyệt thảo luận của học viên">
              <Table dataSource={comments} columns={commentColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} />
            </Card>
          )}

          {/* Stories view */}
          {activeTab === "stories" && (
            <Card title="Stories đang hiển thị trên bảng tin" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingStory(null); storyForm.resetFields(); setIsStoryModalOpen(true); }}>Thêm Story</Button>}>
              <Table dataSource={stories} columns={storyColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} />
            </Card>
          )}

          {/* Flashcards view */}
          {activeTab === "flashcards" && (
            <Card title="Danh sách Bộ thẻ Flashcard từ vựng" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingDeck(null); deckForm.resetFields(); deckForm.setFieldsValue({ cards: [] }); setIsDeckModalOpen(true); }}>Tạo bộ thẻ</Button>}>
              <Table dataSource={decks} columns={deckColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} />
            </Card>
          )}

          {/* Exams view */}
          {activeTab === "exams" && (
            <Card title="Các bộ đề luyện tập & đề thi thử" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingExam(null); examForm.resetFields(); examForm.setFieldsValue({ questions: [] }); setIsExamModalOpen(true); }}>Thêm đề thi mới</Button>}>
              <Table dataSource={exams} columns={examColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} />
            </Card>
          )}
        </Content>
      </Layout>

      {/* Lesson Add/Edit Modal */}
      <Modal
        title={editingLesson ? "Cập nhật bài học" : "Tạo bài học mới"}
        open={isLessonModalOpen}
        onCancel={() => { setIsLessonModalOpen(false); setEditingLesson(null); }}
        onOk={() => lessonForm.submit()}
        width={600}
      >
        <Form form={lessonForm} layout="vertical" onFinish={saveLesson}>
          <Form.Item name="title" label="Tiêu đề bài giảng" rules={[{ required: true, message: "Nhập tiêu đề" }]}>
            <Input placeholder="Ví dụ: Đại từ & Danh từ chỉ định" />
          </Form.Item>
          <Form.Item name="duration" label="Thời lượng" rules={[{ required: true, message: "Nhập thời lượng" }]}>
            <Input placeholder="Ví dụ: 45:00 hoặc 1:12:30" />
          </Form.Item>
          <Form.Item name="videoUrl" label="Đường dẫn Video bài giảng">
            <Input placeholder="URL của video (.mp4, vimeo, youtube)" />
          </Form.Item>
          <Form.Item name="playlistId" label="Mã danh sách (Playlist ID)">
            <Input placeholder="playlist-grammar" />
          </Form.Item>
          <Form.Item name="thumbnail" label="Ảnh thu nhỏ (Thumbnail Url)">
            <Input.Group compact>
              <Form.Item name="thumbnail" noStyle>
                <Input style={{ width: "calc(100% - 110px)" }} placeholder="Tải ảnh lên hoặc nhập URL" />
              </Form.Item>
              <Upload
                beforeUpload={(file) => {
                  handleUpload(file, (url) => lessonForm.setFieldsValue({ thumbnail: url }));
                  return false;
                }}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} style={{ width: 110 }}>Tải lên</Button>
              </Upload>
            </Input.Group>
          </Form.Item>
        </Form>
      </Modal>

      {/* Story Add/Edit Modal */}
      <Modal
        title={editingStory ? "Cập nhật story" : "Tạo story mới"}
        open={isStoryModalOpen}
        onCancel={() => { setIsStoryModalOpen(false); setEditingStory(null); }}
        onOk={() => storyForm.submit()}
        width={500}
      >
        <Form form={storyForm} layout="vertical" onFinish={saveStory}>
          <Form.Item name="name" label="Tên học viên" rules={[{ required: true, message: "Nhập tên" }]}>
            <Input placeholder="Ví dụ: Hoàng Lan Hương" />
          </Form.Item>

          <Form.Item name="avatar" label="Ảnh đại diện (Avatar URL)">
            <Input.Group compact>
              <Form.Item name="avatar" noStyle>
                <Input style={{ width: "calc(100% - 110px)" }} placeholder="Để trống để dùng ảnh mặc định" />
              </Form.Item>
              <Upload
                beforeUpload={(file) => {
                  handleUpload(file, (url) => storyForm.setFieldsValue({ avatar: url }));
                  return false;
                }}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} style={{ width: 110 }}>Tải lên</Button>
              </Upload>
            </Input.Group>
          </Form.Item>

          <Form.Item name="image" label="Ảnh story hiển thị (Bắt buộc)" rules={[{ required: true, message: "Tải lên ảnh story" }]}>
            <Input.Group compact>
              <Form.Item name="image" noStyle>
                <Input style={{ width: "calc(100% - 110px)" }} placeholder="Ảnh bảng tin hiển thị" />
              </Form.Item>
              <Upload
                beforeUpload={(file) => {
                  handleUpload(file, (url) => storyForm.setFieldsValue({ image: url }));
                  return false;
                }}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} style={{ width: 110 }}>Tải lên</Button>
              </Upload>
            </Input.Group>
          </Form.Item>
        </Form>
      </Modal>

      {/* Deck Add/Edit Modal */}
      <Modal
        title={editingDeck ? "Chỉnh sửa bộ thẻ" : "Tạo bộ thẻ mới"}
        open={isDeckModalOpen}
        onCancel={() => { setIsDeckModalOpen(false); setEditingDeck(null); }}
        onOk={() => deckForm.submit()}
        width={750}
      >
        <Form form={deckForm} layout="vertical" onFinish={saveDeck}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="title" label="Tiêu đề bộ thẻ" rules={[{ required: true, message: "Nhập tiêu đề" }]}>
                <Input placeholder="Ví dụ: Vocabulary Unit 1" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="category" label="Danh mục (Phân loại)" rules={[{ required: true, message: "Chọn danh mục" }]}>
                <Select onChange={(val) => {
                  const mapping: Record<string, string> = {
                    vocabulary: "Từ vựng",
                    idiom: "Thành ngữ",
                    phrasal_verb: "Cụm động từ",
                    collocation: "Kết hợp từ",
                    grammar: "Ngữ pháp",
                    mixed: "Tổng hợp"
                  };
                  deckForm.setFieldsValue({ categoryLabel: mapping[val] || "Tổng hợp" });
                }}>
                  <Option value="vocabulary">Vocabulary</Option>
                  <Option value="idiom">Idioms</Option>
                  <Option value="phrasal_verb">Phrasal Verbs</Option>
                  <Option value="collocation">Collocations</Option>
                  <Option value="grammar">Grammar</Option>
                  <Option value="mixed">Mixed</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="categoryLabel" label="Nhãn hiển thị" rules={[{ required: true, message: "Nhãn hiển thị" }]}>
                <Input placeholder="Ví dụ: Từ vựng" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="Nguồn bộ đề (Loại)" rules={[{ required: true, message: "Chọn nguồn đề" }]}>
                <Select>
                  <Option value="system">Hệ thống cấp (System)</Option>
                  <Option value="custom">Học viên tự biên soạn (Custom)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isLocked" label="Khóa nội dung VIP?" rules={[{ required: true, message: "Xác nhận trạng thái khóa" }]}>
                <Select>
                  <Option value={false}>Mở khóa miễn phí</Option>
                  <Option value={true}>Chỉ dành cho VIP (Lock)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="cards">
            {(fields, { add, remove }) => (
              <Card size="small" title="Danh sách các thẻ từ vựng" extra={<Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>Thêm thẻ</Button>}>
                <div style={{ maxHeight: 300, overflowY: "auto", paddingRight: 8 }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, "front"]}
                        rules={[{ required: true, message: "Nhập mặt trước" }]}
                      >
                        <Input placeholder="Mặt trước (Tiếng Anh)" style={{ width: 300 }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "back"]}
                        rules={[{ required: true, message: "Nhập mặt sau" }]}
                      >
                        <Input placeholder="Mặt sau (Nghĩa Tiếng Việt)" style={{ width: 330 }} />
                      </Form.Item>
                      <DeleteOutlined onClick={() => remove(name)} style={{ color: "#f43f5e", cursor: "pointer", fontSize: 16 }} />
                    </Space>
                  ))}
                  {fields.length === 0 && <div style={{ textAlign: "center", color: "#94a3b8" }}>Chưa có thẻ nào được thêm. Nhấn 'Thêm thẻ' để bắt đầu.</div>}
                </div>
              </Card>
            )}
          </Form.List>
        </Form>
      </Modal>

      {/* Exam Add/Edit Modal */}
      <Modal
        title={editingExam ? "Chỉnh sửa đề thi" : "Thêm đề thi mới"}
        open={isExamModalOpen}
        onCancel={() => { setIsExamModalOpen(false); setEditingExam(null); }}
        onOk={() => examForm.submit()}
        width={800}
      >
        <Form form={examForm} layout="vertical" onFinish={saveExam}>
          <Row gutter={16}>
            <Col span={14}>
              <Form.Item name="title" label="Tiêu đề đề thi" rules={[{ required: true, message: "Nhập tiêu đề" }]}>
                <Input placeholder="Ví dụ: Đề thi thử THPT Quốc gia 2026 - Sở Hà Nội" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="category" label="Phân loại" rules={[{ required: true, message: "Chọn phân loại" }]}>
                <Select>
                  <Option value="school-exams">Đề thi thử THPT (Sở/Trường)</Option>
                  <Option value="mock-test">Đề thi thử TOEIC Online</Option>
                  <Option value="progress-test">Đề luyện tập định kỳ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="duration" label="Thời gian (phút)" rules={[{ required: true, message: "Nhập số phút" }]}>
                <InputNumber min={5} max={180} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <Card size="small" title="Ngân hàng câu hỏi trắc nghiệm" extra={<Button type="dashed" onClick={() => add({ number: fields.length + 1, options: { A: "", B: "", C: "", D: "" } })} icon={<PlusOutlined />}>Thêm câu hỏi</Button>}>
                <div style={{ maxHeight: 350, overflowY: "auto", paddingRight: 8 }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card key={key} size="small" style={{ marginBottom: 12, border: "1px solid #ebf0f4" }} extra={<Button type="text" danger onClick={() => remove(name)} icon={<DeleteOutlined />}>Xóa câu</Button>}>
                      <Row gutter={8}>
                        <Col span={4}>
                          <Form.Item {...restField} name={[name, "number"]} label="Câu số" rules={[{ required: true }]}>
                            <InputNumber style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col span={20}>
                          <Form.Item {...restField} name={[name, "text"]} label="Nội dung câu hỏi" rules={[{ required: true, message: "Nhập nội dung" }]}>
                            <Input placeholder="Nhập câu hỏi (Ví dụ: The free clinic was founded...)" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={8}>
                        <Col span={6}>
                          <Form.Item {...restField} name={[name, "options", "A"]} label="Lựa chọn A" rules={[{ required: true, message: "Nhập A" }]}>
                            <Input placeholder="Đáp án A" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item {...restField} name={[name, "options", "B"]} label="Lựa chọn B" rules={[{ required: true, message: "Nhập B" }]}>
                            <Input placeholder="Đáp án B" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item {...restField} name={[name, "options", "C"]} label="Lựa chọn C" rules={[{ required: true, message: "Nhập C" }]}>
                            <Input placeholder="Đáp án C" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item {...restField} name={[name, "options", "D"]} label="Lựa chọn D" rules={[{ required: true, message: "Nhập D" }]}>
                            <Input placeholder="Đáp án D" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={8}>
                        <Col span={6}>
                          <Form.Item {...restField} name={[name, "correctAnswer"]} label="Đáp án Đúng" rules={[{ required: true, message: "Chọn đáp án đúng" }]}>
                            <Select>
                              <Option value="A">A</Option>
                              <Option value="B">B</Option>
                              <Option value="C">C</Option>
                              <Option value="D">D</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={18}>
                          <Form.Item {...restField} name={[name, "explanation"]} label="Hướng dẫn giải thích đáp án chi tiết">
                            <TextArea autoSize={{ minRows: 1, maxRows: 3 }} placeholder="Giải thích vì sao chọn đáp án này..." />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                  {fields.length === 0 && <div style={{ textAlign: "center", color: "#94a3b8" }}>Chưa có câu hỏi nào. Nhấn 'Thêm câu hỏi' để khởi tạo đề.</div>}
                </div>
              </Card>
            )}
          </Form.List>
        </Form>
      </Modal>
    </Layout>
  );
}
