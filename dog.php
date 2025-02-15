<?php

abstract class animal
{
    public function getName()
    {

    }

    abstract public function getDescription();
    abstract public function getType();
}

class Dog
{
    protected $name = "";
    public $color = "";

    public function __construct($name, $color)
    {
        $this->name = $name;
        $this->color = $color;
    }

    public function cal($param1, $param2)
    {
        return $this->add();
    }

    private function add()
    {
        $num = 0;
        $num1 = 1;
        return $num + $num1;
    }
}

class Siba extends Dog, Animal
{
    public function cal($param1, $param2, $param3)
    {
        return 3;
    }

}

$dog = new Siba('Peter', 'black');
$dog->cal('1', '2');

