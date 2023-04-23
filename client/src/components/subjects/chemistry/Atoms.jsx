import React, { useState, useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextBasedTutorial from "../../teachingComponents/TextBasedTutorial";


const content = {

  sections: [
    {
      title: "MATTER and ATOMS",
      body: [
        {
          title: "matter",
          text: "MATTER describes everything that we can see, touch, smell, or feel. In other words, matter is anything that has mass and takes up space (including air and almost everything else).",
        },
        {
          title: "atom",
          text: "The smallest unit of matter is called an ATOM. If you chop a piece of metal into a bajillion pieces, the smallest bit you are left with that still has the properties of the metal is called an atom. The word atom is derived from a Greek word that means “cannot be divided.” (And the Greeks didn't even have a particle accelerator!)",
        },
      ],
    },
    {
      title: "ELEMENTS and MOLECULES",
      body: [
        {
          title: "element",
          text: "An element is a pure substance that consists of only one type of atom. There are 118 known elements, each with its unique properties.",
        },
        {
          title: "molecule",
          text: "A molecule is a group of two or more atoms held together by chemical bonds. Molecules are the building blocks of many substances, including air, water, and sugar.",
        },
      ],
    },
    {
      title: "THE PERIODIC TABLE",
      body: [
        {
          title: "periodic table",
          text: "The periodic table is a tabular arrangement of the chemical elements, organized on the basis of their atomic number, electron configurations, and chemical properties.",
        },
        {
          title: "groups",
          text: "The periodic table is divided into 18 groups, each with its unique properties. Elements in the same group have similar chemical properties.",
        },
      ],
    },
  ],
};

const Atoms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const currentUrl = location.pathname;

  const [content, setContent] = useState(null);

  useEffect(() => {
    // dispatch(getTutorial('atoms'))
  }, []);

  return (
    <div>
      <Flex justifyContent="flex-end">
        <Button colorScheme="blue" onClick={() => navigate(`${currentUrl}/add-slide`)}>
          Add Slide
        </Button>
      </Flex>
      {content ? <TextBasedTutorial content={content} /> : <p>Loading content...</p>}
    </div>
  );
};

export default Atoms;
