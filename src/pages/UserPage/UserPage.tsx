import React, { useState } from "react";
import { Card, Button, Spinner, Form } from "react-bootstrap";
import { updateUser } from "@/core/api/user.api";
import "./UserPage.css";
import { useAuthState } from "@/core/store/useAuthState";
import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";

export const UserPage: React.FC = () => {
  const { role, userData } = useAuthState();

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password && password.length < 6) {
      setMessage("Пароль должен содержать не менее 6 символов");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await updateUser({
        password: password.trim(),
      });
      setMessage("Данные успешно обновлены!");
    } catch (error) {
      console.error("Ошибка обновления данных:", error);
      setMessage("Ошибка обновления данных. Попробуйте ещё раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-page-container">
      <BreadCrumbs crumbs={[{ label: "Настройки" }]} />
      <Card className="user-profile-card">
        <Card.Body>
          <Card.Title>Профиль пользователя</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя"
                value={userData?.name}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Почта</Form.Label>
              <Form.Control
                type="email"
                value={userData?.email}
                disabled
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Роль</Form.Label>
              <Form.Control type="text" value={role} disabled readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите новый пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" /> Сохранение...
                </>
              ) : (
                "Сохранить"
              )}
            </Button>
          </Form>

          {message && <div className="alert alert-info mt-3">{message}</div>}
        </Card.Body>
      </Card>
    </div>
  );
};
