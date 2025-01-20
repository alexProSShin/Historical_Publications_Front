import "./Navbar.css";

export const Navbar = () => {
  console.log("navbar rendered");

  return (
    <nav className="my_navbar">
      <div id="bread-portal"></div>

      {/*  <a href="{{if .publicationId}}/publications/{{.publicationId}}{{else}}#{{end}}" className="publication-link">
    <img src="/images/publication.svg" alt="" className="publication-icon {{if .publicationId}}active{{end}}" />
    {{ if .eventsCount }}
      <span className="event-count">{{ .eventsCount }}</span>
    {{ end }}
  </a> */}
      {/*  <div className="navbar__breadcrumbs_block">
        <BreadCrumbs crumbs={[{ label: "События" }]} />
      </div> */}
    </nav>
  );
};
