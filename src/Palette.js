import React, { useEffect, useRef } from "react";
import * as go from "gojs";

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
      $(go.Shape, "Rectangle", { fill: null }),
      $(
        go.Picture,
        { margin: 10, width: 50, height: 50 },
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
      style={{ border: "solid 1px black", width: "200px", height: "400px" }}
    />
  );
}

export default Palette;
