nova.commands.register("ForkLauncher.runFork", (_) => {
  if (!nova.workspace.path) {
    nova.workspace.showInformativeMessage(
      nova.localize("This workspace has no path for Fork to open.")
    );
    return;
  }

  var process = new Process("/usr/bin/open", {
    args: ["-a", "Fork", nova.workspace.path],
  });

  var lines = [];
  process.onStderr(function (data) {
    if (data) {
      lines.push(data);
    }
  });

  process.onDidExit(function (status) {
    if (status != 0) {
      nova.workspace.showInformativeMessage(
        nova.localize("Error Launching Fork:") + "\n\n" + lines.join("")
      );
    }
  });

  process.start();
});
