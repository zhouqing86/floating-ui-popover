import "./styles.css";

import { Popover } from "./Popover";
import { NestedPopover } from "./NestedPopover";

export default function App() {
  return (
    <div className="App">
      <h1>Floating UI Modal Popover</h1>
      <p>Tabbing cycles through the popover contents without leaving.</p>

      <Popover
        render={({ close, labelId, descriptionId }) => (
          <>
            <h3 id={labelId}>Create new app</h3>
            <p id={descriptionId}>Keep the name short!</p>
            <input placeholder="Name" />
            <button onClick={close}>Create</button>
          </>
        )}
      >
        <button>Click to open popover</button>
      </Popover>

      <NestedPopover
        render={({ close, labelId, descriptionId }) => (
          <>
            <h3 id={labelId}>Create new app</h3>
            <p id={descriptionId}>Keep the name short!</p>
            <input placeholder="Name" />
            <NestedPopover
              render={({ close, labelId }) => (
                <>
                  <h3 id={labelId}>Description</h3>
                  <input placeholder="" />
                  <button onClick={close}>Close</button>
                </>
              )}
            >
              <button>More options...</button>
            </NestedPopover>
            <button onClick={close}>Create</button>
          </>
        )}
      >
        <button>Click to open nested popover</button>
      </NestedPopover>
    </div>
  );
}
