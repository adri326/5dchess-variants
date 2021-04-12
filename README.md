# 5D Chess variant and puzzle repository

This is a repository of user-submitted variants and puzzles for the game [5D Chess with Multiverse Time Travel](https://5dchessiwhtmultiversetimetravel.com/).
These are saved in [the 5DPGN + 5DFEN format](https://github.com/adri326/5dchess-notation).

The repository is organized as follows:

## Variants

Variants meant to be played should go in the `variants` folder.
Each variant should be put in their own sub-folder, named after that variant.
The PGN should be put in a file called `variant.5dpgn` within that sub-folder, and follow the following template:

```pgn
[Board "custom"]
[Mode "5D"]
{Please leave the above tags as-is and edit the information below:}
[VariantName "Your Variant Name"] {This should be the same name as the directory name}
[Promotions "Q,N,R,B"]
[InitialMultiverses "0"]
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]

{Prefer inputting moves here rather than duplicating 5DFEN boards}
```

You may put comments and analysis of different lines in separate files.

### Submitting

You should fork this repository and clone it on your computer (or directly put the files from the website client).
Then, open a pull request. Be sure to mention the name of the variant(s) in the pull request's body.

You may also submit pull requests to suggest modifications or corrections to existing variants.
These pull requests should not introduce new variants.

### Formatting guidelines

The `variant.5dpgn` file should follow the following guidelines, which are here to make reading and parsing the variants easier:

- It should not contain any comment (enclosed within curly braces: `{}`; comments should go in a separate file)
- If there are moves, they should be separated from the header by exactly one blank line <!-- TODO: have them follow the raw format? -->
- White should play first
- Timelines should be described from the center to the outside, with the following order:
  - For odd starting timelines: `0`, `-1`, `1`, `-2`, `2`, etc.
  - For even starting timelines: `+0`, `-0`, `1`, `-1`, `2`, `-2`, `3`, etc.
- If a timeline has multiple starting boards (eg. `Standard - Turn Zero`), the boards should be ordered by increasing time coordinate
- Boards should not go further back than `T0b` (you should otherwise shift them forward)
- Any board on `T0b` should not be playable (you should otherwise shift all of the boards forward by one turn)
- Please keep it to non-meme variants on the main branch

So that people can easily browse the repository online, you may create a file named `README.md`, containing a short description of the variant.

## Puzzles

*TODO, looking for ideas*

<!-- DRAFT:

Puzzles should go in the `puzzles` folder.
The `puzzles` folder is organized into several sub-folders:

- `mate-in-1`

If it is your first puzzle submission, you should create a sub-folder with your name in the corresponding category and put the puzzle in it,
otherwise you should put the puzzle in your sub-folder.

-->

## Licensing

The encoded games, commentaries and analysis are available under the CC0 license, which you can read in the [LICENSE](./LICENSE) file.
Any new submission must be made available under the CC0 license.

## Using this repository

You may add this repository as a git submodule in your project:

```
git submodule add https://github.com/adri326/5dchess-variants 5dchess-variants
```

Users will then have to use `git clone --recurse-submodules <your repository>` when cloning your repository.
