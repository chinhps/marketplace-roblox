import { ButtonCustomProps } from "@/types/service.type";
import { Box, Button } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

export default function ButtonCustom({
  children,
  ...props
}: ButtonCustomProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    // Vẽ khung bao quanh
    const borderWidth = 2;
    const borderColor = "#000";
    const { width, height } = (
      canvas as HTMLCanvasElement
    ).getBoundingClientRect();

    (context as CanvasRenderingContext2D).clearRect(0, 0, width, height);
    (context as CanvasRenderingContext2D).lineWidth = borderWidth;
    (context as CanvasRenderingContext2D).strokeStyle = borderColor;
    (context as CanvasRenderingContext2D).strokeRect(
      borderWidth / 2,
      borderWidth / 2,
      width - borderWidth,
      height - borderWidth
    );
  }, []);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      ></canvas>
      <Button {...props}>{children}</Button>
    </div>
  );
}