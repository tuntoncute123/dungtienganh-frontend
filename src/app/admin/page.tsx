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
  App,
  Grid,
  Drawer
} from "antd";
import {
  PlayCircleOutlined,
  InstagramOutlined,
  BookOutlined,
  FileTextOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  MenuOutlined,
  UserOutlined,
  CheckOutlined
} from "@ant-design/icons";

const COURSE_MAP: Record<string, string> = {
  "toan-9-he-2k12": "TOÁN 9 | KHÓA HÈ 2K12",
  "toan-12-l-nen-tang": "TOÁN 12 | KHOÁ [L] NỀN TẢNG 12 2027",
  "toan-12-f-he-thong": "TOÁN 12 | KHOÁ [F] HỆ THỐNG NỀN TẢNG 11 2027",
  "500-cau-chong-sai-ngu": "500 CÂU CHỐNG SAI NGU KINH ĐIỂN",
  "tieng-anh-10-hk2": "TIẾNG ANH 10 | KHOÁ HỌC KÌ 2 - HS 2K11",
  "tieng-anh-11-hk2": "TIẾNG ANH 11 | KHOÁ HỌC KÌ 2 - HS 2K10",
  "tieng-anh-10-hk1": "TIẾNG ANH 10 | KHOÁ HỌC KÌ 1 - HS 2K11",
  "tieng-anh-11-hk1": "TIẾNG ANH 11 | KHOÁ HỌC KÌ 1 - HS 2K10",
  "tieng-anh-9-he-2k12": "TIẾNG ANH 9 | KHÓA HÈ 2K12",
  "tieng-anh-9-ngu-phap": "TIẾNG ANH 9 | KHÓA NGỮ PHÁP TOÀN DIỆN"
};

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function AdminPage() {
  const { message: msg } = App.useApp();
  const [activeTab, setActiveTab] = useState<string>("lessons");
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Data states
  const [lessons, setLessons] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [decks, setDecks] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

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

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  // Upload helpers
  const [uploadLoading, setUploadLoading] = useState(false);

  // Forms
  const [lessonForm] = Form.useForm();
  const [storyForm] = Form.useForm();
  const [deckForm] = Form.useForm();
  const [examForm] = Form.useForm();
  const [exerciseForm] = Form.useForm();
  const [userForm] = Form.useForm();

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

  const fetchStories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/stories?admin=true`);
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

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`);
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (e: any) {
      msg.error("Lỗi khi tải danh sách học sinh");
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchLessons(),
      fetchStories(),
      fetchDecks(),
      fetchExams(),
      fetchUsers()
    ]);
    setLoading(false);
  };


  useEffect(() => {
    loadAllData();
  }, []);

  // Handle custom upload trigger
  const handleUpload = async (file: File, callback: (url: string) => void) => {
    setUploadLoading(true);
    const isVideo = file.type.startsWith("video/");
    const loadingMessage = isVideo 
      ? "Đang tải lên và nén video trên server (Quá trình này có thể mất vài phút, vui lòng không đóng trang)..." 
      : "Đang tải tập tin lên...";
    
    msg.loading({ content: loadingMessage, key: "uploading", duration: 0 });
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        msg.success({ content: isVideo ? "Nén và tải video lên thành công! 🎉" : "Tải lên thành công!", key: "uploading" });
        callback(data.url);
      } else {
        msg.error({ content: data.error || "Tải lên thất bại", key: "uploading" });
      }
    } catch (error) {
      msg.error({ content: "Có lỗi xảy ra khi upload", key: "uploading" });
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

  // Exercise CRUD for video lesson
  const openExerciseModal = async () => {
    const currentExerciseId = lessonForm.getFieldValue("exerciseId");
    if (currentExerciseId) {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/exams?id=${currentExerciseId}`);
        if (res.ok) {
          const data = await res.json();
          // Map questions with qType
          const mappedQuestions = (data.questions || []).map((q: any) => {
            const hasOptions = q.options && (q.options.A || q.options.B || q.options.C || q.options.D);
            return {
              ...q,
              qType: hasOptions ? "multiple-choice" : "gap-filling"
            };
          });
          exerciseForm.setFieldsValue({
            title: data.title,
            duration: data.duration,
            questions: mappedQuestions
          });
        }
      } catch (e) {
        msg.error("Lỗi khi tải bài tập cũ");
      } finally {
        setLoading(false);
      }
    } else {
      // Empty modal
      exerciseForm.resetFields();
      exerciseForm.setFieldsValue({
        title: `Bài tập: ${lessonForm.getFieldValue("title") || "Bài giảng mới"}`,
        duration: 20,
        questions: []
      });
    }
    setIsExerciseModalOpen(true);
  };

  const saveExercise = async (values: any) => {
    try {
      const currentExerciseId = lessonForm.getFieldValue("exerciseId");
      const isEdit = !!currentExerciseId;
      const url = `${API_BASE_URL}/api/exams`;
      const method = isEdit ? "PUT" : "POST";

      const processedQuestions = (values.questions || []).map((q: any) => {
        const isGapFilling = q.qType === "gap-filling";
        return {
          number: parseInt(q.number as any) || 1,
          text: q.text || "",
          options: isGapFilling ? {} : (q.options || {}),
          correctAnswer: q.correctAnswer || "",
          explanation: q.explanation || null
        };
      });

      const body = {
        title: values.title,
        category: "progress-test", // Always save as progress-test for homework
        duration: parseInt(values.duration as any) || 20,
        questions: processedQuestions,
        id: isEdit ? currentExerciseId : undefined
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const data = await res.json();
        msg.success("Lưu bài tập đính kèm thành công!");
        // Update the lesson form's exerciseId
        lessonForm.setFieldsValue({ exerciseId: data.id });
        setIsExerciseModalOpen(false);
      } else {
        const err = await res.json();
        msg.error(err.error || "Không thể lưu bài tập");
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

  const approveStory = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/stories`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isApproved: true })
      });
      if (res.ok) {
        msg.success("Duyệt story thành công!");
        fetchStories();
      } else {
        msg.error("Không thể duyệt story");
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
      
      const processedQuestions = (values.questions || []).map((q: any) => {
        const isGapFilling = q.qType === "gap-filling";
        return {
          number: parseInt(q.number as any) || 1,
          text: q.text || "",
          options: isGapFilling ? {} : (q.options || {}),
          correctAnswer: q.correctAnswer || "",
          explanation: q.explanation || null
        };
      });

      const body = {
        title: values.title,
        category: values.category,
        duration: parseInt(values.duration as any) || 60,
        questions: processedQuestions,
        id: isEdit ? editingExam.id : undefined
      };

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

  // User CRUD
  const saveUser = async (values: any) => {
    try {
      const isEdit = !!editingUser;
      const url = `${API_BASE_URL}/api/users`;
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit ? { ...values, id: editingUser.id } : values;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        msg.success(`${isEdit ? "Cập nhật" : "Tạo mới"} học sinh thành công!`);
        setIsUserModalOpen(false);
        setEditingUser(null);
        userForm.resetFields();
        fetchUsers();
      } else {
        const err = await res.json();
        msg.error(err.message || err.error || "Không thể lưu học sinh");
      }
    } catch (e) {
      msg.error("Lỗi hệ thống");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        msg.success("Xóa tài khoản học sinh thành công!");
        fetchUsers();
      } else {
        const err = await res.json();
        msg.error(err.message || "Không thể xóa học sinh");
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


  const storyColumns = [
    {
      title: "Story Image",
      dataIndex: "image",
      key: "image",
      render: (src: string) => <img src={src} alt="story content" style={{ width: 40, height: 60, objectFit: "cover", borderRadius: 4 }} />
    },
    { title: "Học viên", dataIndex: "name", key: "name" },
    {
      title: "Loại Story",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        if (type === "badge") return <Tag color="success">Huy hiệu</Tag>;
        if (type === "post") return <Tag color="purple">Bài đăng</Tag>;
        return <Tag color="blue">Tải ảnh lên</Tag>;
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (isApproved: boolean) => (
        isApproved ? <Tag color="green">Đã duyệt ✅</Tag> : <Tag color="orange">Chờ duyệt ⏳</Tag>
      )
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          {!record.isApproved && (
            <Button
              type="primary"
              style={{ backgroundColor: "#22c55e", borderColor: "#22c55e" }}
              icon={<CheckOutlined />}
              size="small"
              onClick={() => approveStory(record.id)}
            >
              Duyệt
            </Button>
          )}
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
                questions: (record.questions || []).map((q: any) => {
                  const hasOptions = q.options && (q.options.A || q.options.B || q.options.C || q.options.D);
                  return {
                    ...q,
                    qType: hasOptions ? "multiple-choice" : "gap-filling"
                  };
                })
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

  const userColumns = [
    { title: "Tài khoản", dataIndex: "username", key: "username", render: (text: string) => <strong>{text}</strong> },
    { title: "Họ và tên", dataIndex: "name", key: "name" },
    { 
      title: "Mật khẩu", 
      dataIndex: "plainPassword", 
      key: "plainPassword",
      render: (pw: string) => pw 
        ? <span style={{ fontFamily: "monospace", background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>{pw}</span>
        : <Tag color="orange">Chưa có</Tag>
    },
    { 
      title: "Khóa học được học", 
      dataIndex: "allowedCourses", 
      key: "allowedCourses",
      render: (allowed: string[]) => {
        if (!allowed || allowed.length === 0) return <Tag color="default">Chưa phân quyền</Tag>;
        return (
          <Space size={[0, 4]} wrap>
            {allowed.map(courseId => (
              <Tag color="blue" key={courseId}>{COURSE_MAP[courseId] || courseId}</Tag>
            ))}
          </Space>
        );
      }
    },
    { 
      title: "Đề thi được làm", 
      dataIndex: "allowedExams", 
      key: "allowedExams",
      render: (allowed: string[]) => {
        if (!allowed || allowed.length === 0) return <Tag color="default">Chưa phân quyền</Tag>;
        return (
          <Space size={[0, 4]} wrap>
            {allowed.map(examId => {
              const exam = exams.find(e => e.id === examId);
              return <Tag color="purple" key={examId}>{exam ? exam.title : examId}</Tag>;
            })}
          </Space>
        );
      }
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
              setEditingUser(record);
              userForm.resetFields();
              userForm.setFieldsValue({
                username: record.username,
                name: record.name,
                password: record.plainPassword || "",
                allowedCourses: record.allowedCourses || [],
                allowedExams: record.allowedExams || [],
              });
              setIsUserModalOpen(true);
            }}
          >
            Sửa & Phân quyền
          </Button>
          <Popconfirm title="Xóa học sinh này?" onConfirm={() => deleteUser(record.id)}>
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
          <Col xs={12} sm={12} md={6}>
            <Card style={{ textAlign: "center", borderLeft: "4px solid #0071f9" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Bài học</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{lessons.length}</div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card style={{ textAlign: "center", borderLeft: "4px solid #10b981" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Stories</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{stories.length}</div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card style={{ textAlign: "center", borderLeft: "4px solid #eab308" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Bộ thẻ học</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{decks.length}</div>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card style={{ textAlign: "center", borderLeft: "4px solid #a855f7" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Bộ đề thi</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{exams.length}</div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  const adminMenu = (
    <Menu
      mode="inline"
      selectedKeys={[activeTab]}
      onClick={(e) => {
        setActiveTab(e.key);
        if (isMobile) setDrawerOpen(false);
      }}
      style={{ borderRight: 0, marginTop: isMobile ? 0 : 12 }}
      items={[
        { key: "lessons", icon: <PlayCircleOutlined />, label: "Bài học" },
        { key: "stories", icon: <InstagramOutlined />, label: "Stories" },
        { key: "flashcards", icon: <BookOutlined />, label: "Bộ thẻ từ vựng" },
        { key: "exams", icon: <FileTextOutlined />, label: "Đề thi & Câu hỏi" },
        { key: "users", icon: <UserOutlined />, label: "Quản lý Học sinh" },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Desktop Sidebar Sider */}
      {!isMobile && (
        <Sider width={220} theme="light" style={{ borderRight: "1px solid #ebf0f4" }}>
          <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #ebf0f4" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#0071f9" }}>TD-ADMIN PANEL</div>
          </div>
          {adminMenu}
        </Sider>
      )}

      {/* Mobile/Tablet Drawer Sidebar */}
      {isMobile && (
        <Drawer
          title={<div style={{ fontWeight: 800, fontSize: 16, color: "#0071f9" }}>TD-ADMIN PANEL</div>}
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          styles={{ body: { padding: 0 } }}
          width={220}
        >
          {adminMenu}
        </Drawer>
      )}

      {/* Main Content Area */}
      <Layout>
        <Header style={{ background: "#fff", padding: isMobile ? "0 12px" : "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ebf0f4", height: isMobile ? "auto" : 64, minHeight: 64, flexDirection: isMobile ? "column" : "row", paddingBottom: isMobile ? 12 : 0, paddingTop: isMobile ? 12 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: isMobile ? "space-between" : "flex-start" }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerOpen(true)}
                style={{ fontSize: 18, marginRight: 8 }}
              />
            )}
            <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, color: "#1e293b", flexGrow: 1 }}>
              {activeTab === "lessons" && (isMobile ? "Quản lý Bài học" : "Quản lý Bài học video")}
              {activeTab === "stories" && (isMobile ? "Stories" : "Quản lý Stories bảng tin")}
              {activeTab === "flashcards" && (isMobile ? "Bộ thẻ học" : "Quản lý Bộ thẻ Flashcard học tập")}
              {activeTab === "exams" && (isMobile ? "Đề thi & Câu hỏi" : "Quản lý Đề thi khảo sát & Đề thi thử")}
              {activeTab === "users" && (isMobile ? "Quản lý Học sinh" : "Quản lý tài khoản Học sinh & Phân quyền")}
            </div>
          </div>
          <Space style={{ marginTop: isMobile ? 12 : 0, width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "flex-end" : "flex-start" }}>
            <Button type="primary" size={isMobile ? "small" : "middle"} onClick={loadAllData} icon={<DatabaseOutlined />}>{isMobile ? "Đồng bộ" : "Đồng bộ DB"}</Button>
          </Space>
        </Header>

        <Content style={{ padding: isMobile ? 12 : 24, background: "#f8fafc" }}>
          {renderDashboardStats()}

          {/* Lessons view */}
          {activeTab === "lessons" && (
            <Card title="Danh sách Video bài giảng" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingLesson(null); lessonForm.resetFields(); setIsLessonModalOpen(true); }}>Thêm bài giảng mới</Button>}>
              <Table dataSource={lessons} columns={lessonColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} scroll={{ x: "max-content" }} />
            </Card>
          )}

          {/* Stories view */}

          {/* Stories view */}
          {activeTab === "stories" && (
            <Card title="Stories đang hiển thị trên bảng tin" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingStory(null); storyForm.resetFields(); storyForm.setFieldsValue({ type: "upload", isApproved: false }); setIsStoryModalOpen(true); }}>Thêm Story</Button>}>
              <Table dataSource={stories} columns={storyColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} scroll={{ x: "max-content" }} />
            </Card>
          )}

          {/* Flashcards view */}
          {activeTab === "flashcards" && (
            <Card title="Danh sách Bộ thẻ Flashcard từ vựng" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingDeck(null); deckForm.resetFields(); deckForm.setFieldsValue({ cards: [] }); setIsDeckModalOpen(true); }}>Tạo bộ thẻ</Button>}>
              <Table dataSource={decks} columns={deckColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} scroll={{ x: "max-content" }} />
            </Card>
          )}

          {/* Exams view */}
          {activeTab === "exams" && (
            <Card title="Các bộ đề luyện tập & đề thi thử" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingExam(null); examForm.resetFields(); examForm.setFieldsValue({ questions: [] }); setIsExamModalOpen(true); }}>Thêm đề thi mới</Button>}>
              <Table dataSource={exams} columns={examColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} scroll={{ x: "max-content" }} />
            </Card>
          )}

          {/* Users view */}
          {activeTab === "users" && (
            <Card title="Danh sách Học sinh & Phân quyền học tập" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingUser(null); userForm.resetFields(); userForm.setFieldsValue({ allowedCourses: [], allowedExams: [] }); setIsUserModalOpen(true); }}>Tạo tài khoản học sinh</Button>}>
              <Table dataSource={users} columns={userColumns} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} scroll={{ x: "max-content" }} />
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
          <Form.Item name="videoUrl" label="Video bài giảng">
            <Input.Group compact>
              <Form.Item name="videoUrl" noStyle>
                <Input style={{ width: "calc(100% - 120px)" }} placeholder="Tải video lên Cloudflare hoặc dán link" />
              </Form.Item>
              <Upload
                beforeUpload={(file) => {
                  const isVideo = file.type.startsWith("video/");
                  if (!isVideo) {
                    msg.error("Chỉ chấp nhận tệp video!");
                    return false;
                  }
                  const isLt100M = file.size / 1024 / 1024 < 100;
                  if (!isLt100M) {
                    msg.warning("Video nặng hơn 100MB có thể tải lên lâu. Khuyên dùng Handbrake nén trước.");
                  }
                  handleUpload(file, (url) => lessonForm.setFieldsValue({ videoUrl: url }));
                  return false;
                }}
                showUploadList={false}
                accept="video/*"
              >
                <Button icon={<UploadOutlined />} style={{ width: 120 }} loading={uploadLoading}>Tải video</Button>
              </Upload>
            </Input.Group>
          </Form.Item>

          <Form.Item name="exerciseId" noStyle>
            <Input type="hidden" />
          </Form.Item>

          <Form.Item label="Bài tập đính kèm (Luyện tập sau bài học)">
            <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.exerciseId !== currentValues.exerciseId} noStyle>
              {() => {
                const currentExerciseId = lessonForm.getFieldValue("exerciseId");
                return (
                  <Space>
                    {currentExerciseId ? (
                      <Tag color="success">Đã soạn bài tập đính kèm ✅</Tag>
                    ) : (
                      <Tag color="warning">Chưa có bài tập ôn luyện ⚠️</Tag>
                    )}
                    <Button type="primary" size="small" onClick={openExerciseModal} icon={<PlusOutlined />}>
                      {currentExerciseId ? "Chỉnh sửa bài tập" : "Soạn bài tập ôn luyện"}
                    </Button>
                  </Space>
                );
              }}
            </Form.Item>
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
      </Modal>      {/* Exercise Add/Edit Modal (Homework) */}
      <Modal
        title="Soạn bài tập ôn luyện (Luyện tập sau bài học)"
        open={isExerciseModalOpen}
        onCancel={() => setIsExerciseModalOpen(false)}
        onOk={() => exerciseForm.submit()}
        width={800}
      >
        <Form form={exerciseForm} layout="vertical" onFinish={saveExercise}>
          <Row gutter={16}>
            <Col xs={24} sm={18}>
              <Form.Item name="title" label="Tiêu đề bộ bài tập" rules={[{ required: true, message: "Nhập tiêu đề bài tập" }]}>
                <Input placeholder="Ví dụ: Bài tập ôn luyện Chuyên đề 1 - Danh từ" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item name="duration" label="Thời gian làm bài (phút)" rules={[{ required: true, message: "Nhập số phút" }]}>
                <InputNumber min={5} max={120} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <Card size="small" title="Ngân hàng câu hỏi bài tập" extra={<Button type="dashed" onClick={() => add({ number: fields.length + 1, options: { A: "", B: "", C: "", D: "" } })} icon={<PlusOutlined />}>Thêm câu hỏi</Button>}>
                <div style={{ maxHeight: 350, overflowY: "auto", paddingRight: 8 }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card key={key} size="small" style={{ marginBottom: 12, border: "1px solid #ebf0f4" }} extra={<Button type="text" danger onClick={() => remove(name)} icon={<DeleteOutlined />}>Xóa câu</Button>}>
                      <Row gutter={8}>
                        <Col xs={24} sm={4} md={3}>
                          <Form.Item {...restField} name={[name, "number"]} label="Câu số" rules={[{ required: true }]}>
                            <InputNumber style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={6} md={5}>
                          <Form.Item {...restField} name={[name, "qType"]} label="Loại câu hỏi" initialValue="multiple-choice" rules={[{ required: true }]}>
                            <Select>
                              <Option value="multiple-choice">Trắc nghiệm</Option>
                              <Option value="gap-filling">Điền từ (Gap Filling)</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={14} md={16}>
                          <Form.Item {...restField} name={[name, "text"]} label="Nội dung câu hỏi" rules={[{ required: true, message: "Nhập nội dung" }]}>
                            <Input placeholder="Nhập câu hỏi. (Dùng _____ 5 dấu gạch dưới để làm ô trống điền từ)" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.questions?.[name]?.qType !== currentValues.questions?.[name]?.qType
                        }
                      >
                        {() => {
                          const qType = exerciseForm.getFieldValue(["questions", name, "qType"]) || "multiple-choice";
                          const isMC = qType === "multiple-choice";

                          return (
                            <>
                              {isMC && (
                                <Row gutter={8}>
                                  <Col xs={24} sm={12} md={6}>
                                    <Form.Item {...restField} name={[name, "options", "A"]} label="Lựa chọn A" rules={[{ required: true, message: "Nhập A" }]}>
                                      <Input placeholder="Đáp án A" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} sm={12} md={6}>
                                    <Form.Item {...restField} name={[name, "options", "B"]} label="Lựa chọn B" rules={[{ required: true, message: "Nhập B" }]}>
                                      <Input placeholder="Đáp án B" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} sm={12} md={6}>
                                    <Form.Item {...restField} name={[name, "options", "C"]} label="Lựa chọn C" rules={[{ required: true, message: "Nhập C" }]}>
                                      <Input placeholder="Đáp án C" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} sm={12} md={6}>
                                    <Form.Item {...restField} name={[name, "options", "D"]} label="Lựa chọn D" rules={[{ required: true, message: "Nhập D" }]}>
                                      <Input placeholder="Đáp án D" />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              )}

                              <Row gutter={8}>
                                <Col xs={24} sm={8} md={6}>
                                  {isMC ? (
                                    <Form.Item {...restField} name={[name, "correctAnswer"]} label="Đáp án Đúng" rules={[{ required: true, message: "Chọn đáp án đúng" }]}>
                                      <Select>
                                        <Option value="A">A</Option>
                                        <Option value="B">B</Option>
                                        <Option value="C">C</Option>
                                        <Option value="D">D</Option>
                                      </Select>
                                    </Form.Item>
                                  ) : (
                                    <Form.Item {...restField} name={[name, "correctAnswer"]} label="Đáp án Đúng (Điền từ)" rules={[{ required: true, message: "Nhập đáp án đúng" }]}>
                                      <Input placeholder="Ví dụ: went hoặc has gone / is going" />
                                    </Form.Item>
                                  )}
                                </Col>
                                <Col xs={24} sm={16} md={18}>
                                  <Form.Item {...restField} name={[name, "explanation"]} label="Hướng dẫn giải thích đáp án chi tiết">
                                    <TextArea autoSize={{ minRows: 1, maxRows: 3 }} placeholder="Giải thích vì sao chọn đáp án này..." />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </>
                          );
                        }}
                      </Form.Item>
                    </Card>
                  ))}
                  {fields.length === 0 && <div style={{ textAlign: "center", color: "#94a3b8" }}>Chưa có câu hỏi nào. Nhấn 'Thêm câu hỏi' để khởi tạo đề.</div>}
                </div>
              </Card>
            )}
          </Form.List>
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
          <Form.Item name="type" label="Loại Story" initialValue="upload" rules={[{ required: true }]}>
            <Select>
              <Option value="upload">Tải ảnh lên (Cần duyệt)</Option>
              <Option value="badge">Huy hiệu hệ thống (Tự động duyệt)</Option>
              <Option value="post">Bài viết hệ thống (Tự động duyệt)</Option>
            </Select>
          </Form.Item>

          <Form.Item name="isApproved" label="Trạng thái duyệt" initialValue={false} rules={[{ required: true }]}>
            <Select>
              <Option value={true}>Đã duyệt ✅</Option>
              <Option value={false}>Chờ duyệt ⏳</Option>
            </Select>
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
            <Col xs={24} sm={12}>
              <Form.Item name="title" label="Tiêu đề bộ thẻ" rules={[{ required: true, message: "Nhập tiêu đề" }]}>
                <Input placeholder="Ví dụ: Vocabulary Unit 1" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
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
            <Col xs={24} sm={6}>
              <Form.Item name="categoryLabel" label="Nhãn hiển thị" rules={[{ required: true, message: "Nhãn hiển thị" }]}>
                <Input placeholder="Ví dụ: Từ vựng" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="type" label="Nguồn bộ đề (Loại)" rules={[{ required: true, message: "Chọn nguồn đề" }]}>
                <Select>
                  <Option value="system">Hệ thống cấp (System)</Option>
                  <Option value="custom">Học viên tự biên soạn (Custom)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
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
                    <Row key={key} gutter={8} style={{ marginBottom: 8, display: "flex", alignItems: "center" }}>
                      <Col xs={24} sm={11}>
                        <Form.Item
                          {...restField}
                          name={[name, "front"]}
                          rules={[{ required: true, message: "Nhập mặt trước" }]}
                          style={{ marginBottom: isMobile ? 8 : 0 }}
                        >
                          <Input placeholder="Mặt trước (Tiếng Anh)" style={{ width: "100%" }} />
                        </Form.Item>
                      </Col>
                      <Col xs={21} sm={11}>
                        <Form.Item
                          {...restField}
                          name={[name, "back"]}
                          rules={[{ required: true, message: "Nhập mặt sau" }]}
                          style={{ marginBottom: 0 }}
                        >
                          <Input placeholder="Mặt sau (Nghĩa Tiếng Việt)" style={{ width: "100%" }} />
                        </Form.Item>
                      </Col>
                      <Col xs={3} sm={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <DeleteOutlined onClick={() => remove(name)} style={{ color: "#f43f5e", cursor: "pointer", fontSize: 16 }} />
                      </Col>
                    </Row>
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
            <Col xs={24} md={14}>
              <Form.Item name="title" label="Tiêu đề đề thi" rules={[{ required: true, message: "Nhập tiêu đề" }]}>
                <Input placeholder="Ví dụ: Đề thi thử THPT Quốc gia 2026 - Sở Hà Nội" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={14} md={6}>
              <Form.Item name="category" label="Phân loại" rules={[{ required: true, message: "Chọn phân loại" }]}>
                <Select>
                  <Option value="school-exams">Đề thi thử THPT (Sở/Trường)</Option>
                  <Option value="mock-test">Đề thi thử TOEIC Online</Option>
                  <Option value="progress-test">Đề luyện tập định kỳ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={10} md={4}>
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
                        <Col xs={24} sm={4} md={3}>
                          <Form.Item {...restField} name={[name, "number"]} label="Câu số" rules={[{ required: true }]}>
                            <InputNumber style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={6} md={5}>
                          <Form.Item {...restField} name={[name, "qType"]} label="Loại câu hỏi" initialValue="multiple-choice" rules={[{ required: true }]}>
                            <Select>
                              <Option value="multiple-choice">Trắc nghiệm</Option>
                              <Option value="gap-filling">Điền từ (Gap Filling)</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={14} md={16}>
                          <Form.Item {...restField} name={[name, "text"]} label="Nội dung câu hỏi" rules={[{ required: true, message: "Nhập nội dung" }]}>
                            <Input placeholder="Nhập câu hỏi. (Dùng _____ 5 dấu gạch dưới để làm ô trống điền từ)" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.questions?.[name]?.qType !== currentValues.questions?.[name]?.qType
                        }
                      >
                        {() => {
                          const qType = examForm.getFieldValue(["questions", name, "qType"]) || "multiple-choice";
                          const isMC = qType === "multiple-choice";

                          return (
                            <>
                              {isMC && (
                                <Row gutter={8}>
                                  <Col xs={24} sm={12} md={6}>
                                    <Form.Item {...restField} name={[name, "options", "A"]} label="Lựa chọn A" rules={[{ required: true, message: "Nhập A" }]}>
                                      <Input placeholder="Đáp án A" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} sm={12} md={6}>
                                    <Form.Item {...restField} name={[name, "options", "B"]} label="Lựa chọn B" rules={[{ required: true, message: "Nhập B" }]}>
                                      <Input placeholder="Đáp án B" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} sm={12} md={6}>
                                    <Form.Item {...restField} name={[name, "options", "C"]} label="Lựa chọn C" rules={[{ required: true, message: "Nhập C" }]}>
                                      <Input placeholder="Đáp án C" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} sm={12} md={6}>
                                    <Form.Item {...restField} name={[name, "options", "D"]} label="Lựa chọn D" rules={[{ required: true, message: "Nhập D" }]}>
                                      <Input placeholder="Đáp án D" />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              )}

                              <Row gutter={8}>
                                <Col xs={24} sm={8} md={6}>
                                  {isMC ? (
                                    <Form.Item {...restField} name={[name, "correctAnswer"]} label="Đáp án Đúng" rules={[{ required: true, message: "Chọn đáp án đúng" }]}>
                                      <Select>
                                        <Option value="A">A</Option>
                                        <Option value="B">B</Option>
                                        <Option value="C">C</Option>
                                        <Option value="D">D</Option>
                                      </Select>
                                    </Form.Item>
                                  ) : (
                                    <Form.Item {...restField} name={[name, "correctAnswer"]} label="Đáp án Đúng (Điền từ)" rules={[{ required: true, message: "Nhập đáp án đúng" }]}>
                                      <Input placeholder="Ví dụ: went hoặc has gone / is going" />
                                    </Form.Item>
                                  )}
                                </Col>
                                <Col xs={24} sm={16} md={18}>
                                  <Form.Item {...restField} name={[name, "explanation"]} label="Hướng dẫn giải thích đáp án chi tiết">
                                    <TextArea autoSize={{ minRows: 1, maxRows: 3 }} placeholder="Giải thích vì sao chọn đáp án này..." />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </>
                          );
                        }}
                      </Form.Item>
                    </Card>
                  ))}
                  {fields.length === 0 && <div style={{ textAlign: "center", color: "#94a3b8" }}>Chưa có câu hỏi nào. Nhấn 'Thêm câu hỏi' để khởi tạo đề.</div>}
                </div>
              </Card>
            )}
          </Form.List>
        </Form>
      </Modal>

      {/* User Add/Edit Modal */}
      <Modal
        title={editingUser ? "Chỉnh sửa tài khoản Học sinh & Phân quyền" : "Tạo tài khoản Học sinh mới"}
        open={isUserModalOpen}
        onCancel={() => { setIsUserModalOpen(false); setEditingUser(null); }}
        onOk={() => userForm.submit()}
        width={700}
      >
        <Form form={userForm} layout="vertical" onFinish={saveUser}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="username" label="Tên đăng nhập (Username)" rules={[{ required: true, message: "Nhập tài khoản" }]}>
                <Input placeholder="Ví dụ: nguyenvananh" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="password"
                label={editingUser ? "Mật khẩu hiện tại (có thể chỉnh sửa)" : "Mật khẩu"}
                rules={[{ required: true, message: "Nhập mật khẩu" }]}
              >
                <Input
                  placeholder="Nhập mật khẩu..."
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item name="name" label="Họ và tên học sinh" rules={[{ required: true, message: "Nhập họ tên" }]}>
            <Input placeholder="Ví dụ: Nguyễn Văn Ánh" />
          </Form.Item>

          <Form.Item name="allowedCourses" label="Khóa học được học (Phân quyền)">
            <Select mode="multiple" placeholder="Chọn khóa học được phép học..." style={{ width: "100%" }}>
              {Object.entries(COURSE_MAP).map(([id, name]) => (
                <Option key={id} value={id}>{name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="allowedExams" label="Đề thi / Bài tập được làm (Phân quyền khóa luyện đề)">
            <Select mode="multiple" placeholder="Chọn các đề thi được làm..." style={{ width: "100%" }}>
              {exams.map(exam => (
                <Option key={exam.id} value={exam.id}>
                  {exam.title} ({exam.category === "school-exams" ? "Đề thi trường" : exam.category === "mock-test" ? "Thi thử" : "Luyện tập"})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
