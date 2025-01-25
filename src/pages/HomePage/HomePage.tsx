import { Button } from "@/components/Button/Button";
import { getRoute, RoutesEnum } from "@/router";
import { Link } from "react-router-dom";

import "./HomePage.css";
import { BreadCrumbs } from "@/components/Breadcrubs/BreadCrumbs";

export const HomePage = () => {
  console.log("Home Page rendered");

  return (
    <div className="main_page">
      <BreadCrumbs crumbs={[]} />
      <h1 className="heading text-center">
        Добро пожаловать в Историус – ваше пространство для создания и
        сохранения историй!
      </h1>

      <Link to={getRoute(RoutesEnum.Events)}>
        <Button>К событиям</Button>
      </Link>

      <div className="main_page_subinfo">
        <p className="text-center">Создавайте публикации с глубоким смыслом</p>
        <p className="text-center">
          Историус помогает вам рассказывать истории с фактами и достоверными
          источниками. Вы можете делиться своими находками, личными
          воспоминаниями или историческими открытиями.
        </p>
      </div>

      <div className="main_page_subinfo">
        <p className="text-center">Подтверждайте свои публикации</p>
        <p className="text-center">
          Укажите ссылки на проверенные источники – книги, статьи, архивы и
          другие достоверные данные. Это сделает ваши публикации не только
          интересными, но и надёжными.
        </p>
      </div>

      <div className="main_page_subinfo">
        <p className="text-center">Обогащайте исторические данные</p>
        <p className="text-center">
          Ссылайтесь на события, места и артефакты, чтобы ваши публикации стали
          частью глобальной исторической картины.
        </p>
      </div>
    </div>
  );
};
