import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import productsData from "../apis/mock-data";
import ProductCard from "./ProductCard";

const ChatBot = ({ onViewDetail, onToggleFavorite, favorites }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    const response = mockAiResponse(input);
    setMessages((prev) => [...prev, { sender: "bot", ...response }]);

    setInput("");
  };

  const mockAiResponse = (text) => {
    const lowerText = text.toLowerCase();

    // Gợi ý sản phẩm theo từ khóa
    let filtered = productsData;

    if (lowerText.includes("tiếng anh") && lowerText.includes("mỹ")) {
      filtered = productsData.filter(
        (p) =>
          p.name.toLowerCase().includes("tiếng anh") &&
          p.shortDesc.toLowerCase().includes("mỹ")
      );
    } else if (lowerText.includes("lập trình")) {
      filtered = productsData.filter((p) =>
        p.name.toLowerCase().includes("lập trình")
      );
    } else {
      filtered = productsData.slice(0, 3); // Gợi ý 3 sản phẩm ngẫu nhiên
    }

    return {
      text: `Tôi gợi ý cho bạn ${filtered.length} sản phẩm:`,
      products: filtered,
    };
  };

  return (
    <Box sx={{ mt: 4, border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Chatbot AI tư vấn sản phẩm
      </Typography>

      <List sx={{ maxHeight: 300, overflowY: "auto", mb: 2 }}>
        {messages.map((msg, i) => (
          <ListItem key={i} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: msg.sender === "user" ? "blue" : "green" }}
            >
              {msg.sender === "user" ? "Bạn" : "AI"}:
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {msg.text}
            </Typography>

            {/* Nếu AI trả về sản phẩm */}
            {msg.products && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {msg.products.map((product) => (
                  <Box key={product.id} sx={{ width: 200 }}>
                    <ProductCard
                      product={product}
                      onViewDetail={onViewDetail}
                      onToggleFavorite={onToggleFavorite}
                      isFavorite={favorites.includes(product.id)}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </ListItem>
        ))}
      </List>

      <Box display="flex">
        <TextField
          fullWidth
          placeholder="Bạn muốn tìm gì?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBot;
