import { ReactNode } from "react";
import { CircleAlert, CircleCheckBig, Info, TriangleAlert } from "lucide-react";

interface AlertProps {
  variant?: "info" | "danger" | "success" | "warning";
  children?: ReactNode;
}

function Alert(props: AlertProps) {
  const { variant = "info", children } = props;

  const alertStyles = {
    info: {
      container:
        "flex items-center gap-x-2.5 bg-blue-50 rounded-lg p-3 text-sm text-blue-800",
      icon: <Info />,
      title: "Info alert!",
    },
    danger: {
      container:
        "flex items-center gap-x-2.5 bg-red-100 rounded-lg p-3 text-sm text-red-700",
      icon: <CircleAlert />,
      title: "Danger alert!",
    },
    success: {
      container:
        "flex items-center gap-x-2.5 bg-green-50 rounded-lg p-3 text-sm text-green-700",
      icon: <CircleCheckBig />,
      title: "Success alert!",
    },
    warning: {
      container:
        "flex items-center gap-x-2.5 bg-yellow-50 rounded-lg p-3 text-sm text-yellow-700",
      icon: <TriangleAlert />,
      title: "Warning alert!",
    },
  };

  const style = alertStyles[variant] || alertStyles.info;

  return (
    <div className={style.container} role="alert">
      {style.icon}
      <div>{children ?? <span>{style.title}</span>}</div>
    </div>
  );
}

export default Alert;
