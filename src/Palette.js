import React, { useEffect, useRef } from "react";
import * as go from "gojs";
import "./App.css";

function Palette({ nodeDataArray }) {
  const paletteDiv = useRef(null);

  useEffect(() => {
    const $ = go.GraphObject.make;

    let myPalette = $(go.Palette, {
      // enable Ctrl+Z to undo and Ctrl+Y to redo
      "undoManager.isEnabled": true,
      model: new go.GraphLinksModel(nodeDataArray),
    });

    myPalette.nodeTemplate = $(
      go.Node,
      "Auto",
      { background: "#A0BCC2" },
      //$(go.Shape, "Rectangle", { fill: null }),
      $(
        go.Picture,
        { margin: 10, width: 50, height: 50, background: "white" },
        new go.Binding("source")
      )
    );

    if (paletteDiv.current) {
      myPalette.div = paletteDiv.current;
    }

    return () => {
      myPalette.div = null;
    };
  }, [nodeDataArray]);

  return (
    <div
      ref={paletteDiv}
      style={{ border: "solid 1px black", width: "300px", height: "600px" }}
    />
  );
}

export default Palette;
