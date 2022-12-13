import React from "react";
import NavBar from "../NavBar/Navbar";
import githubImage from "../../images/github.png";
import linkedinImg from "../../images/linkedin.png";

export default function Nosotros() {
  const datos = [
    {
      nombre: "Agustin Reynoso",
      image:
        "https://i.ibb.co/3Wx9mrr/Whats-App-Image-2022-11-29-at-17-49-47.jpg",
      linkedin:
        "https://www.linkedin.com/in/juan-agust%C3%ADn-reynoso-mujica-ba068144/",
      github: "https://github.com/jagustinrm",
    },
    {
      nombre: "Ariel Bravo",
      image: "https://i.ibb.co/dm6qn7g/Ariel.jpg",
      linkedin: "https://www.linkedin.com/in/ariel-bravo-3b4827243/",
      github: "https://github.com/arielbg00",
    },

    {
      nombre: "Frandel Rodriguez",
      image: "https://i.ibb.co/yQGdLzc/Frandel.jpg",
      linkedin:
        "https://www.linkedin.com/in/frandel-joao-rodriguez-palencia-a70519232/",
      github: "https://github.com/Naotari",
    },
    {
      nombre: "Javier Moyano",
      image: "https://i.ibb.co/r5KK1xY/JaviM.jpg",
      linkedin: "https://www.linkedin.com/in/javier-moyano-1ba2691b3/",
      github: "https://github.com/Javymoyano",
    },
    {
      nombre: "Javier Villatoro",
      image: "https://i.ibb.co/br06wB6/JaviV.jpg",
      linkedin: "https://www.linkedin.com/in/javillatoro/",
      github: "https://github.com/Javillat",
    },
    {
      nombre: "Leonardo Fleitas",
      image: "https://i.ibb.co/Xxbn7Zj/Leo.jpg",
      linkedin: "https://www.linkedin.com/in/abel-fleitas-75701b222/",
      github: "https://github.com/abfleitas",
    },
    {
      nombre: "Lucas Magra",
      image: "https://i.ibb.co/9YX8K0K/Lucas.jpg",
      linkedin: "https://www.linkedin.com/in/luqasmagra/",
      github: "https://github.com/luqasmagra",
    },
    {
      nombre: "Veronica Gonzalez",
      image: "https://i.ibb.co/682KGJW/Vero.jpg",

      linkedin: "https://www.linkedin.com/in/veronica-gonzalez-juy",
      github: "https://github.com/verojuy",
    },
  ];

  const Card = ({ nombre, image, linkedin, github }) => {
    return (
      <div className="flex flex-col bg-white p-5 rounded-lg w-[300px] justify-around shadow-xl mt-4 m-auto ">
        <h2 className="font-bold">{nombre}</h2>
        <img
          src={image}
          className="w-40 m-auto mt-2 rounded-full"
          alt="developer"
        />
        <div className="flex mt-2 justify-around">
          <a href={linkedin} target="_blank" className="w-7">
            <img src={linkedinImg} alt="Loading Auto" />
          </a>
          <a href={github} target="_blank" className="w-7">
            <img src={githubImage} alt="Loading Auto" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <div>
        <NavBar />
      </div>
      <div className="my-8 grid grid-cols-4 max-md:flex max-md:flex-col">
        {datos &&
          datos.map((item, index) => {
            return (
              <Card
                nombre={item.nombre}
                image={item.image}
                linkedin={item.linkedin}
                github={item.github}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
}
