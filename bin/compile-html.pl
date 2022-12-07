#!/usr/bin/env perl

use strict;
use warnings;
use Data::Dumper;
use HTML::TreeBuilder::XPath;
use HTML::Element;

my $tree = HTML::TreeBuilder::XPath->new;

my $directory = '../client/docs';
$tree->parse_file($directory . '/index.html');

my @scripts = $tree->findnodes('//script[@src]');
my @styles  = $tree->findnodes('//link[@href]');

foreach(@scripts)
{
	my $scriptFile = $_->attr('src', undef);
	my $scriptPath = $directory . '/' . $scriptFile;

	open my $handle, '<', $scriptPath or die;
	local $/ = undef;
	my $scriptContent = <$handle>;

	$_->push_content($scriptContent);
}

foreach(@styles)
{
	my $styleFile = $_->attr('href', undef);
	my $stylePath = $directory . '/' . $styleFile;

	my $styleTag = HTML::Element->new('style');

	open my $handle, '<', $stylePath or die;
	local $/ = undef;
	my $styleContent = <$handle>;

	$styleTag->push_content($styleContent);

	$_->replace_with($styleTag);
}

print $tree->as_HTML();
print "\n";