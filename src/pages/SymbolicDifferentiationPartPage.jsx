import React, { useRef } from "react";

import _ from "lodash";

import "../style/contents.css";

import SectionBlock from "../components/SectionBlock";
import SectionBox from "../components/SectionBox";
import TextBlock from "../components/TextBlock";
import LatexBlock from "../components/LatexBlock";
import BulletsBlock from "../components/BulletsBlock";
import CodeBlock from "../components/CodeBlock";

const SymbolicDifferentiationPartPage = () => {
	const sections = [
		{ id: _.uniqueId(), content: "Symbolic Differentiation"},
		{ id: _.uniqueId(), content: "Operators"},
		{ id: _.uniqueId(), content: "Formal Languages"},
		{ id: _.uniqueId(), content: "Structural Recursion"},
		{ id: _.uniqueId(), content: "Bringing our Formal Language to life"},
		{ id: _.uniqueId(), content: "Yuck!"},
		{ id: _.uniqueId(), content: "Pretty Printing"},
		{ id: _.uniqueId(), content: "Differentiation"},
		{ id: _.uniqueId(), content: "Simplifying Terms"},
	];

	const sectionRefs = useRef([null, null, null, null, null, null, null, null, null]);

	return (
		<div class="vert-contents">
			<SectionBlock title="Symbolic Differentiation: Part 1" upper>
				<p style={{ paddingBottom: "0.5rem" }}>
					{"2024-02-09"}
				</p>
			</SectionBlock>
			<SectionBox sections={sections} sectionRefs={sectionRefs} />

			<SectionBlock
				ref={(el) => {
					sectionRefs.current[0] = el;
				}}
				key={sections[0].id}
				title={sections[0].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "Symbolic differentiation involves two things. Firstly a symbolic representation of a function, and secondly differentiation. Let's tackle the first part. In a typical program we  might write something like this:  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "C",
					content: "int x = 100;",
				}}
			/>
			<TextBlock
				block={{
					content: "This expression lets us assign the a value to the program variable x. Any operation we perform with x now operates on the value that we've assigned to x (in this case 100). A symbolic view point of x would say that x can be any value, and that we will operate on x as such. Whatever manipulations we perform on x, or however we compose it with  other symbols, we will not assign it a value (at least for the time being). Every operation made on x is done with the understanding that x can take on any value. In this way x is not a variable in a programming sense but x ***is itself the value*** of a program variable representing a symbol in a mathematical expression / term. Later we will see the exact way we will represent this programmatically but it will look a little something like this:  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: "var_x = Term(TermType.VAR, [\"x\"])",
				}}
			/>
			<TextBlock
				block={{
					content: "In this way, var_x represents the mathematical symbol x, and we can program various operators which operate on var_x to represent mathematical operations on x itself. This leads us to the second part of ***Symbolic Differentiation***; differentiation. The main mathematical operation we will seek to represent is this mathematical operation. We will do this symbolically so as to allow us to compute the derivative of a given function for all inputs of its dependant variable.  ",
					id: _.uniqueId(),
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[1] = el;
				}}
				key={sections[1].id}
				title={sections[1].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "But first, what are operators? Operators are mathematical functions which we will represent symbolically in our program.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "You've probably seen a mathematical function in math class before. These include f(x), g(x), f(x, y) and so on. The ***arity*** of a function is the number of parameters it has. f(x) is of arity 1, f(x, y) is of arity 2. Functions like these will thus be represented as unary and binary operators. Additionally we will introduce the usage of 0 arity functions through the use of constants.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "Zero Arity Operator (const):  ",
					id: _.uniqueId(),
				}}
			/>
			<BulletsBlock
				block={{
					content: [
						{ item: "c(.) --> c", id: _.uniqueId() },
					],
				}}
			/>
			<TextBlock
				block={{
					content: "Unary Operators:  ",
					id: _.uniqueId(),
				}}
			/>
			<BulletsBlock
				block={{
					content: [
						{ item: "neg(x) --> -x", id: _.uniqueId() },
						{ item: "ln(x) --> ln(x)", id: _.uniqueId() },
						{ item: "sin(x) --> sin(x)", id: _.uniqueId() },
						{ item: "cos(x) --> cos(x)", id: _.uniqueId() },
						{ item: "tan(x) --> tan(x)", id: _.uniqueId() },
					],
				}}
			/>
			<TextBlock
				block={{
					content: "Binary Operators:  ",
					id: _.uniqueId(),
				}}
			/>
			<BulletsBlock
				block={{
					content: [
						{ item: "+(a, b) --> a + b", id: _.uniqueId() },
						{ item: "-(a, b) --> a - b", id: _.uniqueId() },
						{ item: "*(a, b) --> a x b", id: _.uniqueId() },
						{ item: "/(a, b) --> a / b", id: _.uniqueId() },
						{ item: "pow(a, b) --> a ^ b", id: _.uniqueId() },
					],
				}}
			/>
			<TextBlock
				block={{
					content: "For now we will only deal with a subset of these and will incorporate more in future posts:  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "Zero Arity Operator (const):  ",
					id: _.uniqueId(),
				}}
			/>
			<BulletsBlock
				block={{
					content: [
						{ item: "c(.) --> c", id: _.uniqueId() },
					],
				}}
			/>
			<TextBlock
				block={{
					content: "Unary Operators:  ",
					id: _.uniqueId(),
				}}
			/>
			<BulletsBlock
				block={{
					content: [
						{ item: "neg(x) --> -x", id: _.uniqueId() },
					],
				}}
			/>
			<TextBlock
				block={{
					content: "Binary Operators:  ",
					id: _.uniqueId(),
				}}
			/>
			<BulletsBlock
				block={{
					content: [
						{ item: "+(a, b) --> a + b", id: _.uniqueId() },
						{ item: "-(a, b) --> a - b", id: _.uniqueId() },
						{ item: "*(a, b) --> a x b", id: _.uniqueId() },
						{ item: "/(a, b) --> a / b", id: _.uniqueId() },
					],
				}}
			/>
			<TextBlock
				block={{
					content: "In a matermatical sense we can compose these operators with the help of a brackets to unambiguosly represent complex mathematical expressions / terms.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "For example the matermatical expression:  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$f = \\frac{(x + c_1)(x - c_2)}{x \\cdot x}$" }} />
			<TextBlock
				block={{
					content: "Would be represented as:  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$f = /(*(+(x, c_1), -(x, c_2)),*(x, x))$" }} />
			<TextBlock
				block={{
					content: "Where x is a variable, and c1 and c2 are constants.  ",
					id: _.uniqueId(),
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[2] = el;
				}}
				key={sections[2].id}
				title={sections[2].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "Expressions like the one above imply the existance of a ***formal language***. According to [Wolfram Alpha](https://mathworld.wolfram.com/FormalLanguage.html) a formal language is defined by an alphabet and a set of formation rules.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "The alphabet is a set of atomic symbols which are considered to be the most of elements (we will call them atomic terms) of a language. All other terms in the language are defined by using the set of formation rules in the language on the atomic terms. We will define the formal language for our problem as follows:  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "Our atomic terms will consist of constants and variables.  ",
					id: _.uniqueId(),
				}}
			/>
			<BulletsBlock
				block={{
					content: [
						{ item: "constants: 1, 2, 3, ...", id: _.uniqueId() },
						{ item: "variables: x, y, z, ...", id: _.uniqueId() },
					],
				}}
			/>
			<LatexBlock block={{ content: "$$\\mathcal{A} = constants \\cup variables$$" }} />
			<TextBlock
				block={{
					content: "Our formation rules will consist of the unary and binary operators we described previously. Let this set be:  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$\\mathcal{R} = \\{+, -, *, /\\}$" }} />
			<TextBlock
				block={{
					content: "This then defines our language:  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$\\mathcal{L} = \\{A, R\\}$" }} />
			<TextBlock
				block={{
					content: "In this language:  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$c \\in \\mathcal{L} where c \\in \\mathcal{A} is a constant$" }} />
			<LatexBlock block={{ content: "$x \\in \\mathcal{L} where x \\in \\mathcal{A} is a variable$" }} />
			<LatexBlock block={{ content: "$if a \\in \\mathcal{L} and r \\in \\mathcal{R} is a unary operator then r(a) \\in \\mathcal{L}$" }} />
			<LatexBlock block={{ content: "$if a, b \\in \\mathcal{L} and r \\in \\mathcal{R} then r(a, b) \\in \\mathcal{L} for binary operator r$" }} />
			<TextBlock
				block={{
					content: "Then all $a \\in \\mathcal{L}$ are called terms and each of them that are not atomic have a recursive structure by construction. But what does a does it mean for a term to have a recursive structure? In this case a term is recursive if it is made up of other terms.  ",
					id: _.uniqueId(),
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[3] = el;
				}}
				key={sections[3].id}
				title={sections[3].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "***Structural Recursion*** is recursion that operates on a recursive structure by executing on the parts of said recursive structure and then combining the individual results in some fashion. Like in the case of our formal language, recursive structures typically have some sort of atomic elements. These atomic elements are the key components in a structurally recursive algorithm's base case(s). In our case, the atomic terms of our formal language (namely constants and variables) will guid our base cases.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "Lets define a structurally recursive algorithm `foo(S)` on the terms of our formal language. `foo(S)` takes in a term from our language and returns a value. An implementation of `foo(S)` could look something like this is psuedocode:  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: "def foo(S):\n    if S is CONST:\n        return str(S)\n    elif S is VARIABLE:\n        return str(S)\n    elif S is ADD:\n        return \"(\" + S.arg1 + \" + \" + S.arg2 + \")\"\n    ...",
				}}
			/>
			<TextBlock
				block={{
					content: "In this blog post we will define a couple of structural recusion algorithms. Namely `__repr__`: a function get a easily readable format of our terms. `diffy`: a function to perform differentiation from calculus on our terms, and `simp`: a function which will simplify our terms.  ",
					id: _.uniqueId(),
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[4] = el;
				}}
				key={sections[4].id}
				title={sections[4].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "To simplify the writing of our symbolic differntiator, we will use [Python](https://w.wiki/PoF) because its a [dynamically typed language](https://en.wikipedia.org/wiki/Dynamic_programming_language). We will now define a class in Python to represent our terms from our formal language. To support all of our needs, we will need to a sufficiently generalized representation. Our `Term` class needs to be able to represent zero-arity, binary and unary terms from our language. As such, we will use a list in python to represent the arguments to the terms from our formal language.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "We will also need a way to distinguish between different term types. For this we will introduce a `TermType` enum class. Each `Term` instance will have a member called `type`, indicating  the term type with a value from the `TermType` class. Here's our first implementation of the `TermType` and `Term` classes.  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: "from enum import Enum\nfrom typing import List\n\nclass TermType(Enum):\n    \"\"\" An Enum representing the type of a Term. \"\"\"\n    CONST = 0\n    VAR = 1\n    ADD = 2\n    SUB = 3\n    NEG = 4\n    MUL = 5\n    DIV = 6\n\nclass Term:\n    \"\"\" A class representing terms from our formal language. \"\"\"\n    type: TermType\n    args: List\n\n    def __init__(self, type: TermType, args: List) -> None:\n        self.type = type\n        self.args = args",
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[5] = el;
				}}
				key={sections[5].id}
				title={sections[5].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "Now we're actually able to represent all of the term types in our formal language programmatically. Take the expression $f$ that we saw earlier:  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$f = /(*(+(x, c_1), -(x, c_2)),*(x, x))$" }} />
			<TextBlock
				block={{
					content: "Programatically we can represent this as follows:  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: ">>> Term(TermType.DIV, [Term(TermType.MUL, [Term(TermType.ADD, [Term(TermType.VAR, [\"x\"]), Term(TermType.CONST, [\"2\"])]), Term(TermType.SUB, [Term(TermType.VAR, [\"x\"]), Term(TermType.CONST, [\"3\"])])]), Term(TermType.MUL, [Term(TermType.VAR, [\"x\"]), Term(TermType.VAR, [\"x\"])])])",
				}}
			/>
			<TextBlock
				block={{
					content: "Honestly, you might be pretty close to puking. Making someone write this out to represent a simple expression let alone something a more complex would be madness.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "To solve this problem, we're going to take advantage of a neat little feature that some object orient programming languages offer. Namely ***Operator Overloading***. Operator Overloading lets us use the built in operators of a programming language to operate on class instances instead of just the typical atomic types of a language. Take for example the expression `1 + 2`. As an expression, our program would know to add those two numbers to `3`. Now imagine a `Fruit` class, and two of its instances `apple` and `orange`. What does `apple + orange` mean? Operator Overloading allows us to create our own ***semantics***, that is a meaning for such expressions. In this case we could define `apple + orange --> fruit salad`.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "In Python this is done via special functions called magic functions, because ... well .... they're magic. Lets see how we could  use this to solve our problem.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "Let's say we want to represent `x + x` from our formal language programmatically. Let's take a look at the modifications we'll need to make to our `Term` class to achieve this.  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: "class Term:\n    ...\n    def __add__(self, other):\n        return Term(TermType.ADD, [self, other])",
				}}
			/>
			<TextBlock
				block={{
					content: "Now when we write `x + x`, under the hood python calls `__add__` on the first instance, passing the second instance as the `other` parameter. In this way we can generate the expression `x + x` without havok to use verbose syntax. Let's do the same for the other operators. The  complete code will look like this:  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: "class Term:\n    ...\n    def __add__(self, other):\n        return Term(TermType.ADD, [self, other])\n    def __sub__(self, other):\n        return Term(TermType.SUB, [self, other])\n    def __neg__(self, other):\n        return Term(TermType.NEG, [self])\n    def __mul__(self, other):\n        return Term(TermType.MUL, [self, other])\n    def __truediv__(self, other):\n        return Term(TermType.DIV, [self, other])",
				}}
			/>
			<TextBlock
				block={{
					content: "A small note here that `__neg__` overloads the unary negation operator:  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: "Term(TermType.NEG, [\"x\"]) --> -x",
				}}
			/>
			<TextBlock
				block={{
					content: "Now we're able to represent our term `f` using some much cleaner notation.  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: ">>> f = ((x + c1) * (x - c2)) / (x * x)",
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[6] = el;
				}}
				key={sections[6].id}
				title={sections[6].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "Now if you print the expression `f` that we defined earlier you'll get a very unsatisfactory output from the console.  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: ">>> print(f)\n>>> <diffy.Term object at 0x1028fe160>",
				}}
			/>
			<TextBlock
				block={{
					content: "To get a nice, human readable output, we'll want to define another magic function. This one is called `__repr__` and  it returns a printable representation of our `Term` instances. In this case we'll be returning a string that represents a given `Term`. This is where structural recursion comes into play again. The `__repr__` function we write will make use of the representation of it's arguments to define it's own representation. For binary terms, we first get the representation of its argument terms, and then construct a string to represent the current term given its type. This looks a little something like this:  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: "class Term:\n    ...\n    def __repr__(self) -> str:\n        \"\"\" Generate a string representation of this term. \"\"\"\n        if self.type == TermType.CONST:\n            return self.args[0]\n        elif self.type == TermType.VAR:\n            return self.args[0]\n        elif self.type == TermType.ADD:\n            return f\"({self.args[0]} + {self.args[1]})\"\n        elif self.type == TermType.SUB:\n            return f\"({self.args[0]} - {self.args[1]})\"\n        elif self.type == TermType.NEG:\n            return f\"-{self.args[0]}\"\n        elif self.type == TermType.MUL:\n            return f\"({self.args[0]} * {self.args[1]})\"\n        elif self.type == TermType.DIV:\n            return f\"({self.args[0]} / {self.args[1]})\"",
				}}
			/>
			<TextBlock
				block={{
					content: "So where exactly did we make our recursive calls? Well thats a bit tricky to see because it's hidden. Every time we wrote `{self.args[0]}` we implicitly called `__repr__` on those instances. No when we print our expression `f` we get something similar:  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: ">>> f = ((x + c1) * (x - c2)) / (x * x)\n>>> print(f)\n>>> (((x + 2) * (x - 3)) / (x * x))",
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[7] = el;
				}}
				key={sections[7].id}
				title={sections[7].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "We now get to the workhorse of our symbolic differentiator. We'll call this function `diffy`. It will be yet another function that performs structural recursion on our `Term` instances. Since our function operates on `Term` instances which represent terms in our formal language we're able to perform operations on terms by proxy in a computational manner. The differentiation operator from mathematics is no different.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "At its core differentiation is a set of rules that map terms in our formal language to other terms also found in the formal language. Let's take a look at a few of the ones that you might remember from calculus class.  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$\\frac{d}{dx}c = 0$" }} />
			<LatexBlock block={{ content: "$\\frac{d}{dx}x = 1$" }} />
			<LatexBlock block={{ content: "$\\frac{d}{dx}[f(x) + g(x)] = \\frac{d}{dx}f(x) + \\frac{d}{dx}g(x)$" }} />
			<LatexBlock block={{ content: "$\\frac{d}{dx}[-f(x)] = -\\frac{d}{dx}f(x)$" }} />
			<LatexBlock block={{ content: "$\\frac{d}{dx}[f(x) - g(x)] = \\frac{d}{dx}f(x) - \\frac{d}{dx}g(x)$" }} />
			<LatexBlock block={{ content: "$\\frac{d}{dx}[f(x) \\cdot g(x)] = g(x) \\cdot \\frac{d}{dx}f(x) + f(x) \\cdot \\frac{d}{dx} g(x)$" }} />
			<LatexBlock block={{ content: "$\\frac{d}{dx}\\frac{f(x)}{g(x)} = \\frac{g(x) \\cdot \\frac{d}{dx} f(x) - f(x) \\cdot \\frac{d}{dx}g(x)}{g(x) \\cdot g(x)}$" }} />
			<TextBlock
				block={{
					content: "Where $c \\in \\mathcal{L}$ is a const and $f, g \\in \\mathcal{L}$ are terms.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "Do you notice anything about these rules? Yup, they are recursive definitions with the exeception of the first two which serve as our base cases. These are all the mapping rules you need to express the derivative of any term in our formal language. If you look at each of these rules, you'll notice that they can be grouped by the operator type that is involved. Let's see how we can implement this in our `Term` class.  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: "class Term:\n    ...\n    def diffy(self):\n        \"\"\" Differentiate this Term. \"\"\"\n        if self.type == TermType.CONST:\n            return Term(TermType.CONST, [\"0\"])\n        elif self.type == TermType.VAR:\n            return Term(TermType.CONST, [\"1\"])\n        elif self.type == TermType.NEG:\n            return Term(TermType.NEG, [self.args[0].diffy()])\n        else:\n            arg0_diffy = self.args[0].diffy()\n            arg1_diffy = self.args[1].diffy()\n            if self.type == TermType.ADD:\n                return Term(TermType.ADD, [arg0_diffy, arg1_diffy])\n            elif self.type == TermType.SUB:\n                return Term(TermType.SUB, [arg0_diffy, arg1_diffy])\n            elif self.type == TermType.MUL:\n                return Term(TermType.ADD, [\n                    Term(TermType.MUL, [arg0_diffy, self.args[1]]),\n                    Term(TermType.MUL, [self.args[0], arg1_diffy])\n                ])\n            elif self.type == TermType.DIV:\n                return Term(TermType.DIV, [\n                    Term(TermType.SUB, [\n                        Term(TermType.MUL, [arg0_diffy, self.args[1]]),\n                        Term(TermType.MUL, [self.args[0], arg1_diffy])\n                    ]),\n                    Term(TermType.MUL, [self.args[1], self.args[1]])\n                ])",
				}}
			/>
			<TextBlock
				block={{
					content: "We can now call `diffy` on any `Term` instance and through the power of structural recursion get back its symbolic derivative as another `Term` instance.  ",
					id: _.uniqueId(),
				}}
			/>
			<SectionBlock
				ref={(el) => {
					sectionRefs.current[8] = el;
				}}
				key={sections[8].id}
				title={sections[8].content}
				upper={null}
			/>
			<TextBlock
				block={{
					content: "Let's take a look at the derivative of our term `f` that we've define earlier.  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: ">>> g = ((x + c1) * (x - c2)) / (x * x)\n>>> g.diffy()\n>>> ((((((1 + 0) * (x - 3)) + ((x + 2) * (1 - 0))) * (x * x)) - (((x + 2) * (x - 3)) * ((1 * x) + (x * 1)))) / ((x * x) * (x * x)))",
				}}
			/>
			<TextBlock
				block={{
					content: "While our `__repr__` function goes a long way in getting a representation that doesn't make you nauseous, this is still quite a bit of text to represent our output. Thankfully we can do a little bit better than this.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "If you look closely at the derivative of `f`, you'll find a couple of compound terms that you might be able to simplify mathematically. We now introduce a set of reduction rules that map some complex terms in our formal language to simpler ones. As with the mapping rules used for differentiation, our reduction rules here have corresponding implementations in our symbolic differentiator. Let's take a look at a few of these rules which may be familiar.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "Let $a, b \\in \\mathcal{L}$ be constants and $f \\in \\mathcal{L}$ be compound term.  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$0 + f \\rightarrow{} f$" }} />
			<LatexBlock block={{ content: "$f + 0 \\rightarrow{} f$" }} />
			<LatexBlock block={{ content: "$f - 0 \\rightarrow{} f$" }} />
			<LatexBlock block={{ content: "$0 - f \\rightarrow{} -f$" }} />
			<LatexBlock block={{ content: "$0 \\times f \\rightarrow{} 0$" }} />
			<LatexBlock block={{ content: "$f \\times 0 \\rightarrow{} 0$" }} />
			<LatexBlock block={{ content: "$1 \\times f \\rightarrow{} f$" }} />
			<LatexBlock block={{ content: "$f \\times 1 \\rightarrow{} f$" }} />
			<LatexBlock block={{ content: "$0 \\div f \\rightarrow{} 0$" }} />
			<TextBlock
				block={{
					content: "$f \\div 0 \\rightarrow{} f \\div 0$ print warning  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$f \\div 1 \\rightarrow{} f$" }} />
			<TextBlock
				block={{
					content: "$f \\div f \\rightarrow{} f \\div f$ print warning  ",
					id: _.uniqueId(),
				}}
			/>
			<LatexBlock block={{ content: "$a + b = compute(a + b)$" }} />
			<LatexBlock block={{ content: "$a - b = compute(a - b)$" }} />
			<LatexBlock block={{ content: "$a \\times b = compute(a \\times b)$" }} />
			<LatexBlock block={{ content: "$a \\div b = compute(a \\div b)$" }} />
			<TextBlock
				block={{
					content: "Some of these I've listed, but they would result in an error if you actually computed them. For example dividing by zero has no meaning. When we encounter such a simplification we will print a warning message to the user and return the same term as its simplification.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "We also won't be simplifying terms where one term is divided by the same term. This would patch over a discontinuities when the denominator is 0 and the derivative doesn't exist.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "We'll call our function `simp`, being short for simplify but also just because : ) `simp` will again involve structural recursion on our `Term` instances. Atomic terms in our formal language will help us define our base cases for our recursive function. For all other term types, we will first make recursive calls to simplify the arguments, and then perform our simplification for this term based on the new argument terms.  ",
					id: _.uniqueId(),
				}}
			/>
			<TextBlock
				block={{
					content: "A key note about some of the simplification rules that we dfine above. You'll notice that some of these rules are symmetric: having the same result when we swap the arguments in our simplification rule. We'll have to  handle both of the case if we want to get nicely simplified terms. After implementing all the simplification rules we add a catch-all statment in case we can't simplify the current term. In this case we'll simplify the sib terms and return a new term with the current term's type and the simplified arguments.  ",
					id: _.uniqueId(),
				}}
			/>
			<CodeBlock
				block={{
					language: "python",
					content: "",
				}}
			/>
			<p style={{ textAlign: "center", padding: "2rem"}}>
				Last Updated {"2024-02-16"}
			</p>
		</div>
	);
};

export default SymbolicDifferentiationPartPage;