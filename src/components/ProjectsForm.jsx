import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, FolderGit2 } from "lucide-react";

const emptyProject = {
  name: "",
  type: "",
  description: "",
};

const ProjectsForm = ({ data = [], onChange }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems((previous) => ({ ...previous, [index]: !previous[index] }));
  };
  const handleAddProject = () => {
    onChange([...data, { ...emptyProject }]);
  };

  const handleChangeItem = (index, field, value) => {
    const newData = data.map((project, projectIndex) =>
      projectIndex === index
        ? {
          ...project,
          [field]: value,
        }
        : project
    );

    onChange(newData);
  };

  const handleDeleteProject = (index) => {
    onChange(data.filter((_, projectIndex) => projectIndex !== index));
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FolderGit2 className="size-5 text-violet-500" /> Projects
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          Tambahkan proyek portofolio, tugas akhir, atau karya terbaik Anda.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {data.map((project, index) => (
          <div
            key={project._id || index}
            className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl relative"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h4 className="text-sm font-semibold text-violet-400">Proyek #{index + 1}</h4>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDeleteProject(index)} className="text-neutral-500 hover:text-red-500" title="Hapus Proyek">
                  <Trash2 className="size-4" />
                </button>
                <button type="button" onClick={() => toggleItem(index)} className="text-neutral-400 hover:text-white" title={expandedItems[index] ? "Tutup Proyek" : "Buka Proyek"}>
                  {expandedItems[index] ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                </button>
              </div>
            </div>

            {expandedItems[index] && <div className="flex flex-col gap-4">
              <input
                type="text"
                value={project.name || ""}
                onChange={(event) =>
                  handleChangeItem(index, "name", event.target.value)
                }
                placeholder="Nama proyek"
                className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white"
              />

              <input
                type="text"
                value={project.type || ""}
                onChange={(event) =>
                  handleChangeItem(index, "type", event.target.value)
                }
                placeholder="Tipe/kategori proyek"
                className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white"
              />

              <textarea
                value={project.description || ""}
                onChange={(event) =>
                  handleChangeItem(index, "description", event.target.value)
                }
                placeholder="Deskripsi proyek"
                className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white resize-none h-32"
              />
            </div>}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddProject}
        className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-violet-500/50 text-violet-400 rounded-xl"
      >
        <Plus className="size-4" />
        Tambah Proyek
      </button>
    </div>
  );
};

export default ProjectsForm;