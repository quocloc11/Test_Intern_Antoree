import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Divider,
  Fab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import productsData from "../apis/mock-data";
import ProductCard from "./ProductCard";

const ChatBot = ({ onViewDetail, onToggleFavorite, favorites }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const response = mockAiResponse(input);
    setMessages((prev) => [...prev, { sender: "bot", ...response }]);
    setInput("");
  };

  const mockAiResponse = (text) => {
    const lower = text.toLowerCase();
    let filtered = [];

    if (lower.includes("tiếng anh") && lower.includes("mỹ")) {
      filtered = productsData.filter(
        (p) =>
          p.name.toLowerCase().includes("tiếng anh") &&
          p.shortDesc.toLowerCase().includes("mỹ")
      );
    } else if (lower.includes("lập trình")) {
      filtered = productsData.filter((p) =>
        p.name.toLowerCase().includes("lập trình")
      );
    } else {
      filtered = productsData.slice(0, 3);
    }

    return {
      text: `Tôi gợi ý cho bạn ${filtered.length} sản phẩm phù hợp:`,
      products: filtered,
    };
  };

  return (
    <>
      {!isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "background.paper",
            borderRadius: "20px",
            boxShadow: 3,
            px: 2,
            py: 1,
            cursor: "pointer",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: 6,
              bgcolor: "primary.main",
              color: "#fff",
              "& svg": { color: "#fff" },
            },
          }}
          onClick={() => setIsOpen(true)}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "medium",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            Tôi có thể giúp gì cho bạn?
          </Typography>
          <Fab
            color="primary"
            size="small"
            aria-label="chat"
            sx={{ boxShadow: "none" }}
          >
            <ChatIcon />
          </Fab>
        </Box>
      )}

      {isOpen && (
        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            right: 24,
            bottom: 24,
            width: { xs: "90vw", sm: 360 },
            height: { xs: "70vh", sm: 500 },
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            zIndex: 1400,
            boxShadow: 6,
            bgcolor: "background.paper",
            transition: "all 0.3s ease",
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ChatBot AI
            </Typography>
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)}
              sx={{ color: "#fff" }}
              aria-label="close chat"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              bgcolor: "#f5f5f5",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {messages.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  mt: 8,
                  color: "text.disabled",
                  userSelect: "none",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png"
                  alt="Chatbot"
                  style={{
                    width: 80,
                    marginBottom: 16,
                    opacity: 0.6,
                    userSelect: "none",
                  }}
                  draggable={false}
                />
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Xin chào! Tôi có thể giúp gì cho bạn hôm nay?
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  (Gợi ý: "Tôi muốn học tiếng Anh", "Tìm khoá học lập trình")
                </Typography>
              </Box>
            ) : (
              messages.map((msg, idx) => (
                <Box key={idx} mb={2}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: msg.sender === "user" ? "primary.main" : "success.main",
                      fontWeight: "bold",
                    }}
                  >
                    {msg.sender === "user" ? "Bạn" : "AI"}:
                  </Typography>
                  <Typography
                    variant="body2"
                    mb={1}
                    sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                  >
                    {msg.text}
                  </Typography>

                  {msg.products && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      {msg.products.map((p) => (
                        <Box key={p.id} sx={{ width: { xs: "100%", sm: 150 } }}>
                          <ProductCard
                            product={p}
                            onViewDetail={onViewDetail}
                            onToggleFavorite={onToggleFavorite}
                            isFavorite={favorites.includes(p.id)}
                          />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ))
            )}
          </Box>

          <Divider />

          <Box sx={{ display: "flex", p: 1, bgcolor: "background.paper" }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Nhập nội dung..."
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              sx={{
                bgcolor: "#fff",
                borderRadius: 1,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ddd",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              color="primary"
              sx={{
                ml: 1,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
                color: "#fff",
              }}
              aria-label="send message"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatBot;
