import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";

interface ApplyModalProps {
  title: string;
  items: string[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyModal({ title, items, isOpen, onClose }: ApplyModalProps) {
  const footer = (
    <Button onClick={onClose} className="w-full">
      확인했습니다
    </Button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showCloseButton={false}
      footer={footer}
      className="w-[calc(100vw-32px)] max-w-sm"
      contentClassName="max-h-[60vh] overflow-y-auto"
    >
      <ul className="space-y-8">
        {items.map((item, index) => (
          <li key={index} className="flex gap-8 items-start">
            <span className="mt-10 shrink-0 w-6 h-6 rounded-full bg-orange-400" />
            <span className="text-body3r text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
