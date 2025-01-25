import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "@/router";
import { useAppDispatch, useAppSelector } from "@/core/store/store";
import { clearError, registerThunk } from "@/core/store/auth.slice";
import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, loading, role } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [localErrorMessage, setLocalErrorMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (error) {
      setLocalErrorMessage(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(clearError());
  });

  useEffect(() => {
    if (role !== "guest" && !loading) {
      navigate(RoutesEnum.Events);
    }
  }, [role, loading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setLocalErrorMessage("Пароли не совпадают");
      return;
    }

    setLocalErrorMessage(null);

    dispatch(
      registerThunk({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      })
    );
  };

  return (
    <Container className="mt-5">
      <BreadCrumbs crumbs={[]} />
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Регистрация</h2>

          {localErrorMessage && (
            <Alert variant="danger">{localErrorMessage}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Введите ваш email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                minLength={6}
                placeholder="Введите ваш пароль"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Подтверждение пароля</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                minLength={6}
                placeholder="Повторите ваш пароль"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Загрузка..." : "Зарегистрироваться"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Link to={RoutesEnum.Login}>
              <Button variant="link" className="p-0">
                Уже есть аккаунт? Войти
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
