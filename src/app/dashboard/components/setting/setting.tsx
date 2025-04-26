import React, { useState } from "react";

const WorkspaceSettings = () => {
  const [workspaceName, setWorkspaceName] = useState("bcprodutos");
  const [workspaceSlug, setWorkspaceSlug] = useState("myproducts");

  const handleSaveChanges = (section: "name" | "slug") => {
    console.log(`Saving changes for ${section}`);
  };

  return (
    <div className="w-full p-6 space-y-8">
      {/* Workspace Name Section */}
      <div className="rounded-lg border border-gray-200 p-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-md font-semibold text-gray-900">
              Workspace Name
            </h2>
            <p className="text-gray-500 mt-2">
              This is the name of your workspace on Dub.
            </p>
          </div>

          <input
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            maxLength={32}
            className="w-full  p-2 rounded border border-gray-200"
          />

          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-gray-500">Max 32 characters.</span>
            <button
              className=" border border-gray-200 p-2 rounded"
              onClick={() => handleSaveChanges("name")}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Workspace Slug Section */}
      <div className="rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-md font-semibold text-gray-900">
              Workspace Slug
            </h2>
            <p className="text-gray-500 mt-1">
              This is your workspace's unique slug on Dub.
            </p>
          </div>

          <input
            value={workspaceSlug}
            onChange={(e) => setWorkspaceSlug(e.target.value)}
            maxLength={48}
            className="w-full  p-2 rounded border border-gray-200"
            pattern="[a-z0-9-]*"
          />

          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-gray-500">
              Only lowercase letters, numbers, and dashes. Max 48 characters.
            </span>
            <button  className=" border border-gray-200 p-2 rounded" onClick={() => handleSaveChanges("slug")}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
      {/* Workspace delete Section */}
      <div className="rounded-lg border border-red-700 p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-md font-semibold text-gray-900">
              Delete Workspace
            </h2>
            <p className="text-gray-500 mt-3 text-sm">
              Permanently delete your workspace, custom domain, and all
              associated links + their stats. This action cannot be undone -
              please proceed with caution.
            </p>
          </div>

          <div className="flex justify-end items-center pt-2">
            <button  className=" border border-gray-200 p-2 rounded" onClick={() => handleSaveChanges("slug")}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSettings;
