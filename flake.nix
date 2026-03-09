{
  description = "ClaudeOS Module - TEMPLATE_NAME";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [ nodejs_22 nodePackages.npm git ];
        };

        packages.default = pkgs.buildNpmPackage {
          pname = "claudeos-module-TEMPLATE_NAME";
          version = "1.0.0";
          src = ./.;
          npmDepsHash = "";
        };
      }
    );
}
